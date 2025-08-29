import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { role } = router.query; // get role from query
  const [selectedRole, setSelectedRole] = useState("student");

  useEffect(() => {
    if (role) setSelectedRole(role); // pre-select role from query
  }, [role]);

  return (
    <div>
      <LoginForm initialRole={selectedRole} />
    </div>
  );
}
