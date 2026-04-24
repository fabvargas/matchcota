import Fichamascota from "@/frontend/components/Fichamascota";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MascotaDetalle({ params }: Props) {
  await params;

  return (
    <div>
      <Fichamascota />
    </div>
  );
}