"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Toaster, toast } from "sonner";

function Alfanum() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState(null);
  const handleInputChange = (event) => {
    setCode(event.target.value); // Actualiza el estado con el valor del input
  };

  const marker = async () => {
    try {
      const res = await axios.put(`/api/marker/${code}`);
      toast.success("Evento registrado con éxito"); // Agregado aquí
    } catch (error) {
      console.error("Error al registrar el evento:", error);
      toast.error("Hubo un error al registrar");
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/searchalf/${code}`);

      if (res.data && res.data.length > 0) {
        setResponse(res.data[0]);
        toast.success("Registro encontrado");
      } else {
        // Si la respuesta está vacía, muestra un error
        toast(
          <div>
            <b>Dni no encontrado</b>
            <p>Debe inscribirse en una de estas opciones</p>
            <Button
              className="mt-2  text-xs"
              onClick={() =>
                (window.location.href = "https://form-pucallpa-1.vercel.app/")
              }
            >
              S.Publico
            </Button>
            <Button
              className="mt-2 ml-2 text-xs"
              onClick={() =>
                (window.location.href = "https://form-pucallpa-2.vercel.app/")
              }
            >
              Emp-Prof-Est
            </Button>
            <Button
              className="mt-2 ml-2 text-xs"
              onClick={() =>
                (window.location.href = "https://form-pucallpa-3.vercel.app/")
              }
            >
              I.Especial
            </Button>
          </div>
        );
      }
    } catch (error) {
      console.error("Error al buscar datos:", error);
    }
  };
  return (
    <>
      <Toaster position="top-center" richColors />
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full py-6 text-md bg-slate-400 text-white md:py-2 md:text-sm"
          >
            Alfanumerico
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Colocar codigo alfanumerico</DrawerTitle>
              <DrawerDescription>
                Inserte el codigo recibido en el correo.
              </DrawerDescription>
            </DrawerHeader>
            <div className="pb-2 px-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">
                  <Label htmlFor="email">Codigo</Label>
                  <Input
                    id="alfanum"
                    type="text"
                    placeholder="ABC123"
                    value={code}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2 py-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  Nombre:
                </Label>
                <Label htmlFor="firstName" className="text-left col-span-2">
                  {response?.nombres || "Esperando datos..."}
                </Label>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Apellido:
                </Label>
                <Label htmlFor="lastName" className="text-left col-span-2">
                  {response?.apellidos || "Esperando datos..."}
                </Label>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="dni" className="text-right">
                  DNI/CE:
                </Label>
                <Label htmlFor="dni" className="text-left col-span-2">
                  {response?.dni || "Esperando datos..."}
                </Label>
              </div>
            </div>

            <DrawerFooter>
              <Button
                className="mb-4"
                onClick={() => {
                  fetchData();
                }}
              >
                Buscar
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  marker();
                }}
              >
                Registrar Asistencia
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Alfanum;
