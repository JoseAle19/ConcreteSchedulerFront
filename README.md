# 🏗️ Reserva de Entregas de Concreto - Angular App

Aplicación web para agendar entregas de concreto, mostrando disponibilidad por día y horarios.

## ✨ Funcionalidades

- Calendario con disponibilidad visual (verde/rojo).
- Horarios cargados por fecha seleccionada.
- Formulario de reserva con validación.
- Confirmación y resumen de reserva.
- Consulta de reservas por IDs guardados en localStorage.
- Uso de Signals y entorno dinámico.

## 🧱 Estructura

- `components/calendar` - Muestra días disponibles.
- `components/reservation-modal` - Modal para registrar reservas.
- `services/reservation.service.ts` - Lógica HTTP.
- `environments/` - Archivos `.ts` para desarrollo y producción.

## 🔧 Variables de entorno

```ts
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

-Recuerda correr el backend primero

