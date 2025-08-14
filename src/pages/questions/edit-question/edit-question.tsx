import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import { request } from "../../../config/axios.instance";

const EditQuestion: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const res = await request.get(`/question/${id}`);
      const data = res.data;
      form.setFieldsValue({
        text: data.text,
        options: data.options.join("\n"), // har variant yangi qatorda
        correctIndex: data.correctIndex,
      });
    } catch (error) {
      console.error(error);
      message.error("❌ Savolni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    try {
      await request.put(`/question/${id}`, {
        text: values.text.trim(),
        options: values.options
          .split("\n")
          .map((opt: string) => opt.trim())
          .filter((opt: string) => opt.length > 0),
        correctIndex: Number(values.correctIndex),
      });
      message.success("✅ Savol muvaffaqiyatli yangilandi");
      navigate("/dashboard/question/get");
    } catch (error) {
      console.error(error);
      message.error("❌ Savolni yangilab bo'lmadi");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <Card title="✏️ Savolni tahrirlash" loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Savol matni"
            name="text"
            rules={[{ required: true, message: "Savol matnini kiriting" }]}
          >
            <Input placeholder="Savolni kiriting" />
          </Form.Item>

          <Form.Item
            label="Variantlar (har birini yangi qatordan yozing)"
            name="options"
            rules={[{ required: true, message: "Kamida bitta variant kiriting" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder={`Variant 1\nVariant 2\nVariant 3`}
            />
          </Form.Item>

          <Form.Item
            label="To'g'ri variant indeksi (0 dan boshlanadi)"
            name="correctIndex"
            rules={[{ required: true, message: "Indeksni kiriting" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="primary" htmlType="submit">
              💾 Saqlash
            </Button>
            <Button onClick={() => navigate("/dashboard/question/get")}>
              ❌ Bekor qilish
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditQuestion;
