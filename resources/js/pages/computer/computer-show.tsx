import { ButtonDelete } from '@/components/button-delete';
import ButtonIcon from '@/components/button-icon';
import { index, edit, destroy } from '@/routes/computer';
import { destroy as hardware_destroy, edit as hardware_edit, create as hardware_create } from '@/routes/hardware';
import { destroy as maintenance_destroy, edit as maintenance_edit, create as maintenance_create } from '@/routes/maintenance';
import { destroy as software_destroy, edit as software_edit, create as software_create } from '@/routes/software';
import { } from '@/routes/hardware'
import { Computers } from '@/types/entity';
import { Link } from '@inertiajs/react';
import { Plus, Edit } from 'lucide-react';

type ProsComputerShow = {
    computer: Computers;
    isAdmin: boolean;
}
export default function ComputerShow({ computer, isAdmin }: ProsComputerShow) {

    function formatDate(date?: string | null) {
        if (!date) return '-';
        try {
            return new Date(date).toLocaleString('pt-BR');
        } catch (e) {
            return date;
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">{computer?.nome ?? 'Computador'}</h1>
                    <p className="text-sm text-muted-foreground">ID: {computer?.id}</p>
                </div>
                <div className="flex gap-2">
                    <Link href={index.get()} className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
                        Voltar
                    </Link>
                    {isAdmin &&
                        <>
                            <Link href={edit.url(computer?.id)} className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:opacity-90">
                                <Edit size={16} className="m-1" />
                                Editar
                            </Link>
                            <div className="fixed z-12 bottom-1 right-2 z-10">
                                <ButtonDelete url={destroy.url(computer.id)} size={20} />
                            </div>
                        </>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Card principal com informações básicas */}
                <div className="md:col-span-2 rounded-2xl border p-4 shadow-sm">
                    <h2 className="text-lg font-medium mb-4">Informações</h2>

                    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <dt className="text-xs text-gray-500">Processador</dt>
                            <dd className="mt-1 text-sm">{computer?.processador ?? '-'}</dd>
                        </div>

                        <div>
                            <dt className="text-xs text-gray-500">Memória RAM</dt>
                            <dd className="mt-1 text-sm">{computer?.memoria_ram_gb ?? '-'} GB</dd>
                        </div>

                        <div>
                            <dt className="text-xs text-gray-500">Armazenamento</dt>
                            <dd className="mt-1 text-sm">{computer?.armazenamento_gb ?? '-'} GB</dd>
                        </div>

                        <div>
                            <dt className="text-xs text-gray-500">Sistema Operacional</dt>
                            <dd className="mt-1 text-sm">{computer?.sistema_operacional ?? '-'}</dd>
                        </div>

                        <div>
                            <dt className="text-xs text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm">{computer?.status ?? '-'}</dd>
                        </div>

                        <div>
                            <dt className="text-xs text-gray-500">Local</dt>
                            <dd className="mt-1 text-sm">{computer?.locations.nome ?? '-'}</dd>
                        </div>

                        <div className="sm:col-span-2">
                            <dt className="text-xs text-gray-500">Observações</dt>
                            <dd className="mt-1 text-sm whitespace-pre-wrap">{computer?.observacoes ?? '-'}</dd>
                        </div>

                        <div>
                            <dt className="text-xs text-gray-500">Criado em</dt>
                            <dd className="mt-1 text-sm">{formatDate(computer?.created_at)}</dd>
                        </div>

                        <div>
                            <dt className="text-xs text-gray-500">Última atualização</dt>
                            <dd className="mt-1 text-sm">{formatDate(computer?.updated_at)}</dd>
                        </div>
                    </dl>
                </div>

                <aside className="space-y-4">
                    <div className="rounded-2xl border p-4">
                        <h3 className="text-sm font-medium">Componentes de hardware</h3>
                        <p className="mt-2 text-3xl font-semibold">{computer?.hardware_components?.length ?? 0}</p>
                    </div>

                    <div className="rounded-2xl border p-4">
                        <h3 className="text-sm font-medium">Registros de manutenção</h3>
                        <p className="mt-2 text-3xl font-semibold">{computer?.maintenance_records?.length ?? 0}</p>
                    </div>

                    <div className="rounded-2xl border p-4">
                        <h3 className="text-sm font-medium">Softwares</h3>
                        <p className="mt-2 text-3xl font-semibold">{computer?.software?.length ?? 0}</p>
                    </div>
                </aside>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3 relative">
                <section className="md:col-span-1 rounded-2xl border p-4 relative">
                    <h4 className="font-medium mb-3">Hardware</h4>
                    <ButtonIcon Icon={Plus} href={hardware_create.url(computer.id)} isAbsolute={true} top={10} right={10} size={30} />
                    {computer?.hardware_components && computer.hardware_components.length > 0 ? (
                        <ul className="space-y-3">
                            {computer.hardware_components.map((h) => (
                                <li key={h.id} className="rounded-lg border p-3">
                                    <div className="flex items-center justify-between">
                                        <div style={{ width: '100%' }}>
                                            <div className="font-medium w-100">{h.modelo}</div>
                                            {h.status && <div className="text-sm text-gray-500">Modelo: {h.status}</div>}
                                            {h.capacidade && <div className="text-sm text-gray-500">Capacidade: {h.capacidade} (GB)</div>}

                                            {isAdmin && (
                                                <div className="flex justify-between gap-2 mt-2 ">
                                                    <Link
                                                        href={hardware_edit.url(h.id)}
                                                        className="inline-flex justify-between rounded-md bg-blue-600 px-2 py-1 text-sm text-white hover:opacity-90"
                                                    >
                                                        <Edit size={16} className="m-1" />
                                                    </Link>
                                                    <ButtonDelete url={hardware_destroy.url(h.id)} size={10} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">Nenhum componente cadastrado.</p>
                    )}
                </section>

                <section className="md:col-span-1 rounded-2xl border p-4 relative">
                    <h4 className="font-medium mb-3">Manutenções</h4>
                    <ButtonIcon Icon={Plus} href={maintenance_create.url(computer.id)} isAbsolute={true} top={10} right={10} size={30} />
                    {computer?.maintenance_records && computer.maintenance_records.length > 0 ? (
                        <ul className="space-y-3">
                            {computer.maintenance_records.map((m) => (
                                <li key={m.id} className="rounded-lg border p-3">
                                    <div className="text-sm font-medium">{formatDate(m.created_at)}</div>
                                    <div className="text-sm text-gray-700">{m.descricao}</div>
                                    {m.user_id && (<div className="text-xs text-gray-500 mt-1">Realizado por: {m.user_id}</div>)}
                                    {isAdmin && (
                                        <div className="flex justify-between gap-2 mt-2 ">
                                            <Link
                                                href={maintenance_edit.url(m.id)}
                                                className="inline-flex justify-between rounded-md bg-blue-600 px-2 py-1 text-sm text-white hover:opacity-90"
                                            >
                                                <Edit size={16} className="m-1" />
                                            </Link>
                                            <ButtonDelete url={maintenance_destroy.url(m.id)} size={10} />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">Sem registros de manutenção.</p>
                    )}
                </section>

                <section className="md:col-span-1 rounded-2xl border p-4 relative">
                    <h4 className="font-medium mb-3">Software</h4>
                    <ButtonIcon Icon={Plus} href={software_create.url(computer.id)} isAbsolute={true} top={10} right={10} size={30} />
                    {computer?.software && computer.software.length > 0 ? (
                        <ul className="space-y-3">
                            {computer.software.map((s) => (
                                <li key={s.id} className="rounded-lg border p-3">
                                    <div className="font-medium">{s.nome}</div>
                                    {isAdmin && (
                                        <div className="flex justify-between gap-2 mt-2 ">
                                            <Link
                                                href={software_edit.url(s.id)}
                                                className="inline-flex justify-between rounded-md bg-blue-600 px-2 py-1 text-sm text-white hover:opacity-90"
                                            >
                                                <Edit size={16} className="m-1" />
                                            </Link>
                                            <ButtonDelete url={software_destroy.url(s.id)} size={10} />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">Nenhum software cadastrado.</p>
                    )}
                </section>
            </div>
        </div>
    );
}
