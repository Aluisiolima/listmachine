import { QrCodes } from "@/types/entity";
import {Download, XIcon} from "lucide-react";

type ProsQrModal = {
    qrcode: QrCodes;
    computer_name: string;
    onClose: () => void;
}
export const QrModal: React.FC<ProsQrModal> = ({ qrcode, onClose, computer_name }) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-xl font-semibold tracking-tight text-black text-center">QR Code do Computador {computer_name}</h2>

                <img src={qrcode.url} alt="QR Code" className="w-64 mx-auto" />

                <div className="mt-6 flex justify-between">
                    <button
                        className="px-4 py-2 bg-red-600 rounded"
                        onClick={onClose}
                    >
                        <XIcon size={16}/>
                    </button>

                    <button
                        onClick={() => {
                            const link = document.createElement("a");
                            link.href = qrcode.url ?? '';
                            link.download = `qrcode-${qrcode.id}_${computer_name}.png`;
                            link.click();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        <Download size={16}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
