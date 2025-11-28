import InputError from "@/components/input-error";
import AuthLayout from "@/layouts/auth-layout";
import { Form, Head } from '@inertiajs/react';
import { update } from "@/routes/hardware";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    component: {
        id: number;
        computer_id: number;
        tipo: string;
        modelo: string;
        capacidade?: number | null;
        status: string;
    };
    computer_nome: string;
};

export default function hardwareComponentsEdit({ component, computer_nome }: Props) {
    return (
        <AuthLayout
            title="Editando Componente"
            description={`Editando componente do computador ${computer_nome}`}
        >
            <Head title="Editar Componente" />

            <Form
                {...update.form(component.id)}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">

                            {/* Campo oculto com o ID do computador */}
                            <input
                                type="hidden"
                                name="computer_id"
                                value={component.computer_id}
                            />

                            {/* Tipo */}
                            <div className="grid gap-2">
                                <Label htmlFor="tipo">Tipo</Label>
                                <Input
                                    id="tipo"
                                    type="text"
                                    required
                                    name="tipo"
                                    defaultValue={component.tipo}
                                />
                                <InputError message={errors.tipo} />
                            </div>

                            {/* Modelo */}
                            <div className="grid gap-2">
                                <Label htmlFor="modelo">Modelo</Label>
                                <Input
                                    id="modelo"
                                    type="text"
                                    required
                                    name="modelo"
                                    defaultValue={component.modelo}
                                />
                                <InputError message={errors.modelo} />
                            </div>

                            {/* Capacidade */}
                            <div className="grid gap-2">
                                <Label htmlFor="capacidade">Capacidade (Opcional)</Label>
                                <Input
                                    id="capacidade"
                                    type="number"
                                    name="capacidade"
                                    defaultValue={component.capacidade ?? ""}
                                />
                                <InputError message={errors.capacidade} />
                            </div>

                            {/* Status */}
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Input
                                    id="status"
                                    type="text"
                                    required
                                    name="status"
                                    defaultValue={component.status}
                                />
                                <InputError message={errors.status} />
                            </div>

                            {/* Botão */}
                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={10}
                            >
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
