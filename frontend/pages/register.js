import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const { role } = router.query; // get role from query
  const [selectedRole, setSelectedRole] = useState("student");

  useEffect(() => {
    if (role) setSelectedRole(role); // pre-select role if query param exists
  }, [role]);

  return (
    <div>
      <RegisterForm initialRole={selectedRole} />
    </div>
  );
}
