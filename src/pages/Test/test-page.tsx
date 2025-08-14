import React, { useEffect, useState } from "react";
import { request } from "../../config/axios.instance";
import { Card, Radio, Button, Space, message } from "antd";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const TestPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<
    { choosenIndex: number; questionId: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()
  const fetchQuestions = async () => {
    try {
      const res = await request.get("/question");
      console.log(res.data); 
      setQuestions(res.data.questions);
    } catch (error) {
      console.error(error);
      message.error("Savollarni yuklashda xatolik");
    }
  };
  

  const handleSelect = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId
            ? { ...a, choosenIndex: optionIndex }
            : a
        );
      }
      return [...prev, { choosenIndex: optionIndex, questionId }];
    });
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      message.warning("Iltimos, barcha savollarga javob bering!");
      return;
    }

    setLoading(true);
    try {
      const res = await request.post("/answers/submit", { answers });
      console.log("Natija:", res.data);
      navigate("/result",{state:res.data})
    } catch (error) {
      console.error(error);
      message.error("Javoblarni yuborishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <h2>Imtihon Savollari</h2>
      <Space direction="vertical" style={{ width: "100%" }}>
        {questions.map((q) => (
          <Card key={q.id} title={q.text}>
            <Radio.Group
              onChange={(e) => handleSelect(q.id, e.target.value)}
              value={
                answers.find((a) => a.questionId === q.id)?.choosenIndex ?? null
              }
            >
              {q.options.map((opt, idx) => (
                <Radio key={idx} value={idx}>
                  {opt}
                </Radio>
              ))}
            </Radio.Group>
          </Card>
        ))}
      </Space>

      <Button
        type="primary"
        style={{ marginTop: "20px" }}
        onClick={handleSubmit}
        loading={loading}
      >
        Yakunlash
      </Button>
    </div>
  );
};

export default TestPage;
