"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { useRouter } from "next/navigation";

export const AuthModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser, setSession } = useStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/${isLogin ? "signin" : "signup"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSession(data.session);
        const user = await fetch(`/api/users?userId=${data.session.user.id}`).then((res) => res.json());
        setUser(user);
        router.push("/");
      } else {
        setError(data.error);
      }
    } catch (error: any) {
      console.error("Error during authentication:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full mt-4">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button type="button" onClick={toggleLogin} className="text-blue-500 hover:underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
        <button type="button" onClick={onClose} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
};