import InputError from "@/components/input-error";
import AuthLayout from "@/layouts/auth-layout";
import { Form, Head } from "@inertiajs/react";
import { update } from "@/routes/software";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    software: {
        id: number;
        computer_id: number;
        nome: string;
        observacoes: string;
    };
    computer_nome: string;
};

export default function SoftwareEdit({ software, computer_nome }: Props) {
    return (
        <AuthLayout
            title="Editando Software"
            description={`Editando software do computador ${computer_nome}`}
        >
            <Head title="Editar Software" />

            <Form
                {...update.form(software.id)}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">

                            {/* Campo oculto */}
                            <input type="hidden" name="computer_id" value={software.computer_id} />

                            {/* Nome */}
                            <div className="grid gap-2">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    type="text"
                                    required
                                    name="nome"
                                    defaultValue={software.nome}
                                />
                                <InputError message={errors.nome} />
                            </div>

                            {/* Observações */}
                            <div className="grid gap-2">
                                <Label htmlFor="observacoes">Observações</Label>
                                <Input
                                    id="observacoes"
                                    type="text"
                                    required
                                    name="observacoes"
                                    defaultValue={software.observacoes}
                                />
                                <InputError message={errors.observacoes} />
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
