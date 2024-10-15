import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Alfanum from "./alfanum";
import Readqr from "./readqr";
import Dni from "./dni";

function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Asistencia</CardTitle>
        <CardDescription>
          Elija una opcion para registrar asistencia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Dni />
          </div>
          <div className="grid gap-2">
            <Alfanum />
          </div>
          <div className="grid gap-2">
            <Readqr />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
