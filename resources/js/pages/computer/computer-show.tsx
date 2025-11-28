import { ButtonDelete } from '@/components/button-delete';
import ButtonIcon from '@/components/button-icon';
import { index, edit, destroy } from '@/routes/computer';
import { Computers } from '@/types/entity';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

type ProsComputerShow = {
    computer: Computers;
    isAdmin: boolean;
}
export default function ComputerShow({ computer, isAdmin}: ProsComputerShow) {

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
                            Editar
                        </Link>
                        <div className="fixed z-12 bottom-1 right-2 z-10">
                            <ButtonDelete url={destroy.url(computer.id)} size={20}/>
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
                    <ButtonIcon Icon={Plus} href={''} isAbsolute={true} top={10} right={10} size={30}/>
                    {computer?.hardware_components && computer.hardware_components.length > 0 ? (
                        <ul className="space-y-3">
                        {computer.hardware_components.map((h) => (
                            <li key={h.id} className="rounded-lg border p-3">
                            <div className="flex items-center justify-between">
                                <div>
                                <div className="font-medium">{h.modelo}</div>
                                {h.status && <div className="text-sm text-gray-500">Modelo: {h.status}</div>}
                                {h.capacidade && <div className="text-sm text-gray-500">Capacidade: {h.capacidade}</div>}
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
                    <ButtonIcon Icon={Plus} href={''} isAbsolute={true} top={10} right={10} size={30}/>
                    {computer?.maintenance_records && computer.maintenance_records.length > 0 ? (
                        <ul className="space-y-3">
                        {computer.maintenance_records.map((m) => (
                            <li key={m.id} className="rounded-lg border p-3">
                            <div className="text-sm font-medium">{formatDate(m.created_at)}</div>
                            <div className="text-sm text-gray-700">{m.descricao}</div>
                            {m.user_id && <div className="text-xs text-gray-500 mt-1">Realizado por: {m.user_id}</div>}
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">Sem registros de manutenção.</p>
                    )}
                </section>

                <section className="md:col-span-1 rounded-2xl border p-4 relative">
                    <h4 className="font-medium mb-3">Software</h4>
                    <ButtonIcon Icon={Plus} href={''} isAbsolute={true} top={10} right={10} size={30}/>
                    {computer?.software && computer.software.length > 0 ? (
                        <ul className="space-y-3">
                        {computer.software.map((s) => (
                            <li key={s.id} className="rounded-lg border p-3">
                            <div className="font-medium">{s.nome}</div>
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
