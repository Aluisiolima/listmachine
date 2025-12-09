import InputError from "@/components/input-error";
import AuthLayout from "@/layouts/auth-layout";
import { Form, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { update } from "@/routes/computer";

type ComputerType = {
    id: number;
    nome: string;
    processador: string;
    memoria_ram_gb: number;
    armazenamento_gb: number;
    sistema_operacional: string;
    status: string;
    observacoes?: string | null;
    locations_id: number;
};

type Props = {
    locais: { id: number; nome: string }[];
    computer: ComputerType;
};

export default function EditComputer({ locais, computer }: Props) {
    return (
        <AuthLayout
            title="Editando Computador"
            description="Atualize as informações do computador"
        >
            <Head title={`Editando ${computer.nome}`} />

            <Form
                {...update.form(computer.id)}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    type="text"
                                    name="nome"
                                    required
                                    defaultValue={computer.nome}
                                />
                                <InputError message={errors.nome} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="processador">Processador</Label>
                                <Input
                                    id="processador"
                                    type="text"
                                    name="processador"
                                    required
                                    defaultValue={computer.processador}
                                />
                                <InputError message={errors.processador} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="memoria_ram_gb">Memória RAM (GB)</Label>
                                <Input
                                    id="memoria_ram_gb"
                                    type="number"
                                    name="memoria_ram_gb"
                                    required
                                    defaultValue={computer.memoria_ram_gb}
                                />
                                <InputError message={errors.memoria_ram_gb} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="armazenamento_gb">
                                    Armazenamento Interno (GB)
                                </Label>
                                <Input
                                    id="armazenamento_gb"
                                    type="number"
                                    name="armazenamento_gb"
                                    required
                                    defaultValue={computer.armazenamento_gb}
                                />
                                <InputError message={errors.armazenamento_gb} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="sistema_operacional">
                                    Sistema Operacional
                                </Label>
                                <Input
                                    id="sistema_operacional"
                                    type="text"
                                    name="sistema_operacional"
                                    required
                                    defaultValue={computer.sistema_operacional}
                                />
                                <InputError message={errors.sistema_operacional} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="locations_id">Localização</Label>
                                <select
                                    id="locations_id"
                                    name="locations_id"
                                    required
                                    className="border rounded p-2 h-11"
                                    defaultValue={computer.locations_id}
                                >
                                    <option value="">Selecione...</option>

                                    {locais.map((local) => (
                                        <option key={local.id} value={local.id}>
                                            {local.nome}
                                        </option>
                                    ))}
                                </select>

                                <InputError message={errors.locations_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Input
                                    id="status"
                                    type="text"
                                    name="status"
                                    required
                                    defaultValue={computer.status}
                                />
                                <InputError message={errors.status} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="observacoes">Observações</Label>
                                <textarea
                                    id="observacoes"
                                    name="observacoes"
                                    className="border rounded p-3"
                                    defaultValue={computer.observacoes ?? ""}
                                />
                                <InputError message={errors.observacoes} />
                            </div>

                            <Button type="submit" className="mt-2 w-full">
                                {processing && <Spinner />}
                                Salvar Alterações
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
