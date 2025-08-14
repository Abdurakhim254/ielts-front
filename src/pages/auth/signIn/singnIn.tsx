import React, { useState } from "react";
import "./index.css"
import type { UserLoginData } from "../../../utils/interface/signIn.interface";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { request } from "../../../config/axios.instance";

export const  SignIn: React.FC = () => {
  const [formData, setFormData] = useState<UserLoginData>({
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
      const response = await request.post("/auth/login", formData);
  
      if (response.data) {
        navigate("/dashboard");
      }
    } catch (error: any) {

        if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Email yoki xato");
      }
    }
  };
  
  return (
    <div className="form-container">
      <h2>Foydalanuvchi Formasi</h2>
      <form onSubmit={handleSubmit}>

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
