import React from "react";
import { Button, Card, Form, Input, Space, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { request } from "../../../config/axios.instance";

const QuestionCreate: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        text: values.text,
        options: values.options.filter((o: string) => o.trim() !== ""),
        correctIndex: values.correctIndex,
    };

    
      const response =await request.post("/question", payload);
      if(response.data){
          message.success("Question created successfully!");
          navigate("/dashboard/question/get");
        }
    } catch (error) {
      console.error(error);
      message.error("Error creating question");
    }
  };

  return (
    <Card title="Create Question" style={{ maxWidth: 700, margin: "auto" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          options: ["", "", "", ""], // 4 bo‘sh variant
        }}
      >
        <Form.Item
          label="Question Text"
          name="text"
          rules={[{ required: true, message: "Please enter the question text" }]}
        >
          <Input placeholder="Enter question..." />
        </Form.Item>

        <Form.List name="options">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...field}
                  label={`Option ${index + 1}`}
                  key={field.key}
                  rules={[{ required: true, message: "Please enter option" }]}
                >
                  <Input placeholder={`Option ${index + 1}`} />
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>

        <Form.Item
          label="Correct Answer"
          name="correctIndex"
          rules={[{ required: true, message: "Select the correct answer" }]}
        >
          <Select>
            {[0, 1, 2, 3].map((i) => (
              <Select.Option key={i} value={i}>
                Option {i + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default QuestionCreate;
