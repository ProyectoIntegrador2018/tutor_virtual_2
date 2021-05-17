import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useAuth } from "lib/hooks/useAuth";
import { UserRoleName } from "lib/types/role";
import { HeaderContent } from "./HeaderContent";
import { DownloadCard } from "./DownloadCard";

export function GuidesIndexPageContent() {
  const { role } = useAuth();
  const isSuperadmin = role === UserRoleName.SUPERADMIN;
  const isTutor = role === UserRoleName.TUTOR;
  const isSupervisor = role === UserRoleName.SUPERVISOR;
  // TODO: Convert these to entity based guides.
  return (
    <Box>
      <HeaderContent />
      <Box my={10}>
        <SimpleGrid spacing={6} columns={[1, null, null, 2]}>
          {(isSuperadmin || isTutor || isSupervisor) && (
            <DownloadCard
              title="Manual de Canvas para el tutor"
              description="Archivo PDF"
              filename="ManualDeCanvasParaElTutor.pdf"
            />
          )}
          <DownloadCard
            title="Manual de Canvas para el participante"
            description="Archivo PDF"
            filename="ManualDeCanvasParaElParticipante.pdf"
          />
          {(isSuperadmin || isSupervisor || isTutor) && (
            <DownloadCard
              title="Cómo ser un buen profesor"
              description="Archivo PDF"
              filename="ComoSerUnBuenProfesor.pdf"
            />
          )}
          <DownloadCard
            title="Como descargar tu reconocimiento"
            description="Archivo PDF"
            filename="ComoDescargarTuReconocimiento.pdf"
          />
          <DownloadCard
            title="Comparte tu experiencia"
            description="Archivo PDF"
            filename="ComparteTuExperiencia.pdf"
          />
          {(isSuperadmin || isTutor || isSupervisor) && (
            <DownloadCard
              title="Felicidades"
              description="Archivo PDF"
              filename="Felicidades-CentroVirtualDeAprendizaje.pdf"
            />
          )}
          <DownloadCard
            title="Calendario de aperturas"
            description="Archivo PDF"
            filename="CalendarioDeAperturas.pdf"
          />
          <DownloadCard
            title="Reporte de calificaciones"
            description="Archivo Excel"
            filename="ReporteDeCalificaciones.xlsx"
          />
          {(isSuperadmin || isSupervisor) && (
            <DownloadCard
              title="Reporte de desempeño tutores"
              description="Archivo Excel"
              filename="ReporteDeDesempenoTutores.xlsx"
            />
          )}
          <DownloadCard
            title="Instrucciones detalladas"
            description="Archivo PDF"
            filename="InstruccionesDetalladas.pdf"
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}
