// Palm API constants and functions
const AdjustmentSeverity = {
    ok: 'ok',
    warning: 'warning',
    error: 'error'
};

class WrongPalmError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WrongPalmError';
    }
}

class LivenessError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LivenessError';
    }
}

// Initialize the palm API module
let palmApi;
let isInitialized = false;
var livenessHasStarted = false;

async function initializePalmAPI() {
    if (isInitialized) return;

    // Load the WebAssembly module
    const module = await import('./PalmAPICapture.mjs');
    palmApi = await module.default();

    // Extract the required functions and constants
    const {
        PalmID_Capture,
        _malloc,
        _free,
        ePalmStatus,
        PalmLiveness,
        PalmStrictness,
        PalmType,
        PalmID_ProcessFrame,
        PalmDetected,
        PalmCaptureStatus,
        PalmCaptureStatusWrapper,
        PalmFrame,
        PalmCaptureResult_Create,
        PalmCaptureResult_Free,
        PalmID_CaptureResult,
        PalmCaptureResult,
        PalmID_GetGesture,
        PalmID_GetTouchPoints,
        getPalmCaptureResultDataPtr,
        PalmAdjustment,
        PalmSidedness,
        PalmGesture,
    } = palmApi;
    console.log('PalmAPI module loaded:', palmApi);
    // Store them in the global scope
    window.PalmID_Capture = PalmID_Capture;
    window._malloc = _malloc;
    window._free = _free;
    window.ePalmStatus = ePalmStatus;
    window.PalmLiveness = PalmLiveness;
    window.PalmStrictness = PalmStrictness;
    window.PalmType = PalmType;
    window.PalmID_ProcessFrame = PalmID_ProcessFrame;
    window.PalmDetected = PalmDetected;
    window.PalmCaptureStatus = PalmCaptureStatus;
    window.PalmCaptureStatusWrapper = PalmCaptureStatusWrapper;
    window.PalmFrame = PalmFrame;
    window.PalmCaptureResult_Create = PalmCaptureResult_Create;
    window.PalmCaptureResult_Free = PalmCaptureResult_Free;
    window.PalmID_CaptureResult = PalmID_CaptureResult;
    window.PalmCaptureResult = PalmCaptureResult;
    window.PalmID_GetGesture = PalmID_GetGesture;
    window.PalmID_GetTouchPoints = PalmID_GetTouchPoints;
    window.getPalmCaptureResultDataPtr = getPalmCaptureResultDataPtr;
    window.PalmAdjustment = PalmAdjustment;
    window.PalmSidedness = PalmSidedness;
    window.PalmGesture = PalmGesture;
    

    isInitialized = true;
}

async function addCurrentFrame(video, ctx) {
    const width = video.videoWidth;
    const height = video.videoHeight;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(video, 0, 0);
    const imageData = ctx.getImageData(0, 0, width, height).data;
    
    const imageDataPtr = _malloc(imageData.length);
    if (imageDataPtr === 0) {
        throw new Error('Memory allocation failed for imageData.');
    }
    try {
        palmApi.HEAPU8.set(imageData, imageDataPtr);
        const frame = new PalmFrame();
        frame.create();
        frame.addEncodedImage(imageDataPtr, width, height, 0, 3, PalmType.PalmType_Print);
        if (frame.num_images == 0) {
            throw new Error('No images added to PalmFrame.');
        }
        return frame;
    } finally {
        _free(imageDataPtr);
    }
}

function getCapturedModel() {
    const captureResult = new PalmCaptureResult();
    PalmCaptureResult_Create(captureResult);
    console.log('PalmCaptureResult created.');

    try {
        const ret = PalmID_CaptureResult(captureResult);
        if (ret !== ePalmStatus.ePalm_Success) {
            throw Error(`PalmID_CaptureResult failed with code: ${ret}`);
        }
        console.log('PalmID_CaptureResult succeeded.');
        console.log(`Palm capture sidedness: ${captureResult.sidedness}`);
        console.log(`Palm capture data_size: ${captureResult.data_size}`);

        const resultPtr = getPalmCaptureResultDataPtr(captureResult);
        if (!resultPtr || captureResult.data_size === 0) {
            throw new Error('No data received in CaptureResult.');
        }

        const b = new ArrayBuffer(captureResult.data_size);
        const r = new Uint8Array(b);
        r.set(new Uint8Array(palmApi.HEAPU8.buffer, resultPtr, captureResult.data_size));
        console.log('CaptureResult data bytes (first 16):', r.slice(0, 16));
        return r;
    } finally {
        PalmCaptureResult_Free(captureResult);
    }
}

function palmSidednessToString(sidedness) {
    if (sidedness == PalmSidedness.PalmSidedness_Left) {
        return 'left';
    }
    if (sidedness == PalmSidedness.PalmSidedness_Right) {
        return 'right';
    }
    return null;
}

function palmSidednessFromString(sidedness) {
    if (sidedness == 'left') {
        return PalmSidedness.PalmSidedness_Left;
    }
    if (sidedness == 'right') {
        return PalmSidedness.PalmSidedness_Right;
    }
    if (sidedness) {
        throw new Error('Invalid sidedness value');
    }
    return null;
}

function gestureName(gesture) {
    var n = gesture.constructor.name.substring('PalmGesture_PalmGesture_'.length);
    n = n[0].toLowerCase() + n.slice(1).replace('_', '');
    return n;
}

function adjustmentText(adjustment) {
    switch (adjustment) {
        case PalmAdjustment.PalmAdjustment_MoveLeft:
            return 'Move left';
        case PalmAdjustment.PalmAdjustment_MoveRight:
            return 'Move right';
        case PalmAdjustment.PalmAdjustment_MoveUp:
            return 'Move up';
        case PalmAdjustment.PalmAdjustment_MoveDown:
            return 'Move down';
        case PalmAdjustment.PalmAdjustment_MoveCloser:
            return 'Move closer';
        case PalmAdjustment.PalmAdjustment_MoveFarther:
            return 'Move farther';
        case PalmAdjustment.PalmAdjustment_RotateUpward:
            return 'Rotate upward';
        case PalmAdjustment.PalmAdjustment_RotateParallel:
            return 'Rotate parallel';
        case PalmAdjustment.PalmAdjustment_FlipOver:
            return 'Flip over';
        case PalmAdjustment.PalmAdjustment_SpreadFingers:
            return 'Spread fingers';
        case PalmAdjustment.PalmAdjustment_StraightenFingers:
            return 'Straighten fingers';
        case PalmAdjustment.PalmAdjustment_SpreadThumb:
            return 'Spread thumb';
        case PalmAdjustment.PalmAdjustment_StraightenThumb:
            return 'Straighten thumb';
        case PalmAdjustment.PalmAdjustment_Brighten:
            return 'Palm Overexposed';
        case PalmAdjustment.PalmAdjustment_Darken:
            return 'Palm Too Dark';
        case PalmAdjustment.PalmAdjustment_Focus:
            return 'Focus';
        case PalmAdjustment.PalmAdjustment_KeepStill:
            return 'Hold it!';
        case PalmAdjustment.PalmAdjustment_No_Palm:
            return 'No palm detected';
        case PalmAdjustment.PalmAdjustment_Other:
            return 'Other';
        case PalmAdjustment.PalmAdjustment_None:
            return 'Perfect';
        default:
            return '';
    }
}

function adjustmentSeverity(adjustment) {
    switch (adjustment) {
        case PalmAdjustment.PalmAdjustment_None:
            return AdjustmentSeverity.ok;
        case PalmAdjustment.PalmAdjustment_KeepStill:
            return AdjustmentSeverity.warning;
        default:
            return AdjustmentSeverity.error;
    }
}

// Main palm capture function
async function capturePalm(options) {
    debugger;
    const { video, sidedness: sidednessString, onAdjustment, onLivenessStart, onLivenessGesture, onLivenessTouchPoints, isEnrollment } = options;
    if (!video) {
        throw new Error('video is required');
    }

    // Initialize the palm API if not already initialized
    await initializePalmAPI();

    const sidedness = palmSidednessFromString(sidednessString);
    var livenessMode = PalmLiveness.PalmLiveness_Touch;

    let ret = PalmID_Capture(
        PalmStrictness.PalmStrictness_Enrollment_Unique,
        livenessMode,
    );
    if (ret !== ePalmStatus.ePalm_Success) {
        console.error('PalmID_Capture failed with code:', ret);
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const palmDetected = new PalmDetected();
    const palmCaptureStatus = new PalmCaptureStatusWrapper();
    palmCaptureStatus.setStatus(PalmCaptureStatus.PalmCaptureStatus_Idle);

    let lastSideness = null;
  
    return await new Promise((resolve, reject) => {
        const frameLoop = async (_, __) => {
            try {
                const frame = await addCurrentFrame(video, ctx);
                palmDetected.readiness = PalmStrictness.PalmStrictness_None;
                try {
                    console.time('PalmID_ProcessFrame');
                    ret = PalmID_ProcessFrame(frame, palmDetected, palmCaptureStatus);
                    console.timeEnd('PalmID_ProcessFrame');
                    if (ret != ePalmStatus.ePalm_Success) {
                        throw new Error(`PalmID_ProcessFrame failed with code: ${ret}`);
                    }
                    if (palmDetected.readiness !== PalmStrictness.PalmStrictness_None) {
                        lastSideness = palmDetected.metrics.sidedness < 0.5 ? PalmSidedness.PalmSidedness_Left : PalmSidedness.PalmSidedness_Right;
                        if (sidedness && sidedness !== lastSideness) {
                            reject(new WrongPalmError(`PalmID_ProcessFrame failed with wrong sidedness: ${lastSideness}`));
                            return;
                        }
                        console.log('adjustment', palmDetected.adjustment, adjustmentText(palmDetected.adjustment), adjustmentSeverity(palmDetected.adjustment));
                        if (onAdjustment) {
                            onAdjustment(adjustmentText(palmDetected.adjustment), adjustmentSeverity(palmDetected.adjustment));
                        }
                    } else {
                        onAdjustment(null, AdjustmentSeverity.error);
                    }
                } finally {
                    frame.free();
                }

                console.log('palmCaptureStatus.getStatus', palmCaptureStatus.getStatus().constructor.name);
                switch (palmCaptureStatus.getStatus()) {
                    case PalmCaptureStatus.PalmCaptureStatus_Success:
                        resolve(await getCapturedModel());
                        console.log('Palm capture succeeded.');
                        break;
                    case PalmCaptureStatus.PalmCaptureStatus_Liveness:
                        switch (PalmLiveness.PalmLiveness_Touch) {
                            case PalmLiveness.PalmLiveness_Touch:
                                if (!livenessHasStarted) {
                                    livenessHasStarted = true;
                                    break;
                                }
                                const points = PalmID_GetTouchPoints();
                                console.log('PalmID_GetTouchPoints', points);
                                onLivenessTouchPoints?.call(null, points.thumbTip, points.targetPoint);
                                break;
                            case PalmLiveness.PalmLiveness_Gesture:
                                const gesture = PalmID_GetGesture();
                                const name = gestureName(gesture);
                                console.log('PalmCapture gesture', name);
                                if (gesture != PalmGesture.PalmGesture_None) {
                                    onLivenessGesture?.call(null, name, palmSidednessToString(lastSideness))
                                }
                                break;
                        }
                        break;
                    case PalmCaptureStatus.PalmCaptureStatus_Fail:
                        reject(new LivenessError());
                        break;
                }
            } catch (e) {
                reject(e);
                return;
            }

            if (!video.ended && palmCaptureStatus.getStatus() !== PalmCaptureStatus.PalmCaptureStatus_Success) {
                video.requestVideoFrameCallback(frameLoop);
            }
        };

        video.requestVideoFrameCallback(frameLoop);
    });
}

// Export the functions and constants to the global scope
window.capturePalm = capturePalm;
window.AdjustmentSeverity = AdjustmentSeverity;
window.WrongPalmError = WrongPalmError;
window.LivenessError = LivenessError;