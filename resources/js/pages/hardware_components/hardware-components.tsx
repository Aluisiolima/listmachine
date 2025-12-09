import InputError from "@/components/input-error";
import AuthLayout from "@/layouts/auth-layout";
import { Form, Head } from '@inertiajs/react';
import { store } from "@/routes/hardware";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    computer_id: number;
    computer_nome: string;
};

export default function hardwareComponentsCreate({ computer_id, computer_nome }: Props) {
    return (
        <AuthLayout
            title="Cadastrando Componente"
            description={`Adicionando componente ao computador ${computer_nome}`}
        >
            <Head title="Criando Componente" />

            <Form
                {...store.form()}
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
                                value={computer_id}
                            />

                            {/* Tipo */}
                            <div className="grid gap-2">
                                <Label htmlFor="tipo">Tipo</Label>
                                <Input
                                    id="tipo"
                                    type="text"
                                    required
                                    name="tipo"
                                    placeholder="Ex: Memória RAM, HD, SSD..."
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
                                    placeholder="Ex: Corsair Vengeance DDR4"
                                />
                                <InputError message={errors.modelo} />
                            </div>

                            {/* Capacidade (opcional) */}
                            <div className="grid gap-2">
                                <Label htmlFor="capacidade">Capacidade (Opcional)</Label>
                                <Input
                                    id="capacidade"
                                    type="number"
                                    name="capacidade"
                                    placeholder="Ex: 256 (GB)"
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
                                    placeholder="Ex: Funcionando, Defeituoso..."
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
                                Cadastrar Componente
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
