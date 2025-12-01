import InputError from "@/components/input-error";
import AuthLayout from "@/layouts/auth-layout";
import { Form, Head } from "@inertiajs/react";
import { update } from "@/routes/maintenance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    revision: {
        id: number;
        computer_id: number;
        user_id: number;
        tipo: string;
        descricao: string;
        proxima_revisao: string;
    };
    computer_nome: string;
};

export default function MaintenanceEdit({ revision, computer_nome }: Props) {
    return (
        <AuthLayout
            title="Editando Revisão"
            description={`Editando revisão do computador ${computer_nome}`}
        >
            <Head title="Editar Revisão" />

            <Form
                {...update.form(revision.id)}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">

                            {/* Campos ocultos */}
                            <input type="hidden" name="computer_id" value={revision.computer_id} />
                            <input type="hidden" name="user_id" value={revision.user_id} />

                            {/* Tipo */}
                            <div className="grid gap-2">
                                <Label htmlFor="tipo">Tipo</Label>
                                <Input
                                    id="tipo"
                                    type="text"
                                    required
                                    name="tipo"
                                    defaultValue={revision.tipo}
                                />
                                <InputError message={errors.tipo} />
                            </div>

                            {/* Descrição */}
                            <div className="grid gap-2">
                                <Label htmlFor="descricao">Descrição</Label>
                                <Input
                                    id="descricao"
                                    type="text"
                                    required
                                    name="descricao"
                                    defaultValue={revision.descricao}
                                />
                                <InputError message={errors.descricao} />
                            </div>

                            {/* Próxima revisão */}
                            <div className="grid gap-2">
                                <Label htmlFor="proxima_revisao">Próxima Revisão</Label>
                                <Input
                                    id="proxima_revisao"
                                    type="date"
                                    required
                                    name="proxima_revisao"
                                    defaultValue={revision.proxima_revisao}
                                />
                                <InputError message={errors.proxima_revisao} />
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
