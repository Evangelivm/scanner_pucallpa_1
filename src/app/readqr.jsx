"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Toaster, toast } from "sonner";
const Reader = React.lazy(() => import("./reader"));

function Readqr() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const marker = async () => {
    try {
      const res = await axios.put(`/api/marker/${code}`);
      toast.success("Evento registrado con éxito"); // Agregado aquí
    } catch (error) {
      console.error("Error al registrar el evento:", error);
      toast.error("Hubo un error al registrar");
    }
  };

  useEffect(() => {
    if (code) {
      console.log("Código QR escaneado:", code);

      const fetchData = async () => {
        try {
          const res = await axios.get(`/api/searchqr/${code}`);
          setResponse(res.data[0]);
          toast.success("Registro encontrado");
        } catch (error) {
          console.error("Error al buscar datos:", error);
          toast.error("Registro no encontrado");
        }
      };

      fetchData();
    }
  }, [code]);

  return (
    <>
      <Toaster position="top-center" richColors />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full py-6 text-md bg-slate-400 text-white md:py-2 md:text-sm"
            onClick={() => setIsOpen(true)}
          >
            Escanear Código QR
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Lector QR</DialogTitle>
            <DialogDescription>
              Acerque la cámara al código QR dentro del margen
            </DialogDescription>
          </DialogHeader>

          {/* Renderiza Reader solo cuando el diálogo esté abierto */}
          {isOpen && (
            <Suspense fallback={<div>Cargando el lector...</div>}>
              <Reader
                onScan={(data) => {
                  console.log("Recibiendo datos desde Reader:", data);
                  setCode(data);
                }}
              />
            </Suspense>
          )}

          <div className="grid gap-2 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                Nombre:
              </Label>
              <Label htmlFor="firstName" className="text-left col-span-3">
                {response?.nombres || "Esperando datos..."}
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Apellido:
              </Label>
              <Label htmlFor="lastName" className="text-left col-span-3">
                {response?.apellidos || "Esperando datos..."}
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dni" className="text-right">
                DNI/CE:
              </Label>
              <Label htmlFor="dni" className="text-left col-span-3">
                {response?.dni || "Esperando datos..."}
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tipo" className="text-right">
                Tipo:
              </Label>
              <Label htmlFor="tipo" className="text-left col-span-3">
                {response?.tipo || "Esperando datos..."}
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cerrar
            </Button>

            <Button
              className="mb-4"
              onClick={() => {
                marker();
              }}
            >
              Registrar Asistencia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Readqr;
