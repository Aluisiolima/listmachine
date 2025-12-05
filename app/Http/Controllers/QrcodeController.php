<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQrcodeRequest;
use App\Http\Requests\UpdateQrcodeRequest;
use App\Models\Qrcode;

use Illuminate\Support\Facades\Storage;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\QrCode as EndroidQrCode;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\Writer\Result\ResultInterface;

class QrcodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(int $computer_id)
    {
        $url = route('computer.show', ['id' => $computer_id]);

        $fileName = 'qr_' . uniqid() . '.png';
        $filePath = "qrcodes/{$fileName}";

        $writer = new PngWriter();

        $qrCode = new EndroidQrCode(
            data: $url,
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::High,
            size: 300,
            margin: 10,
            roundBlockSizeMode: RoundBlockSizeMode::Margin,
            foregroundColor: new Color(0, 0, 0),
            backgroundColor: new Color(255, 255, 255)
        );

        $writer = new PngWriter();

        $result = $writer->write($qrCode);

        Storage::disk('public')->put($filePath, $result->getString());

        Qrcode::create([
            'computer_id' => $computer_id,
            'roles_id'    => 2,
            'is_active'   => true,
            'path' => $filePath
        ]);

        return redirect()->route('computer.show', ['id' => $computer_id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        // return Storage::disk('public')->getVisibility();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Qrcode $qrcode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQrcodeRequest $request, Qrcode $qrcode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Qrcode $qrcode)
    {
        //
    }
}
