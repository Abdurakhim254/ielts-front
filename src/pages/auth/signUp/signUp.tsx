import React, {  useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import type { UserRegisterData } from "../../../utils/interface/signUp.interface";
import { request } from "../../../config/axios.instance";
import { useNavigate } from "react-router-dom";

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<UserRegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const navigate=useNavigate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await request.post("/auth/register", formData);
  
      if (response.data) {
        navigate("/signIn");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Xatolik yuz berdi. Qayta urinib ko‘ring.");
      }
    }
  };
  

  return (
    <div className="form-container">
      <h2>Foydalanuvchi Formasi</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ism:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Parol:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Yuborish</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Akkountingiz bormi?{" "}
        <Link to="/signIn" className="link-style">
          Kirish
        </Link>
      </p>
    </div>
  );
};
