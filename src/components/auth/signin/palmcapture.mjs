// Make PalmCapture globally accessible as a function constructor
window.PalmCapture = function (options) {
    this.container = options.container;
    this.sidedness = options.sidedness || null;
    this.enrollment = options.enrollment || false;
    this.onStart = options.onStart || function () { };
    this.onModel = options.onModel || function () { };
    this.onError = options.onError || function () { };
    this.onGesture = options.onGesture || function () { };

    this.hintText = '';
    this.hintSeverity = '';


    this.gesture = null;
    this.gestureSidedness = null;

    this.videoHeight = null;
    this.videoWidth = null;

    this.initialize();
};

window.PalmCapture.prototype.initialize = function () {
    // Create the HTML structure
    //this.container.innerHTML = `
    //    <div class="palm-capture">
    //        <div class="video-container">
    //            <video id="camvideo" autoplay playsinline></video>
    //            <div class="overlay">
    //                <div class="palm-outline"></div>
    //                <div class="gesture-indicator"></div>
    //            </div>
    //        </div>
    //        <div class="instructions">
    //            <p>Position your palm in the frame</p>
    //        </div>

    //            <div class="guide">
    //                <svg width="58" height="62" viewBox="0 0 58 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                    <path d="M47.6702 60.6099C47.3112 61.0669 46.6958 61.4947 45.9601 61.4462C45.4289 61.4114 27.8648 60.2239 27.329 60.1739C25.7944 60.037 24.9221 59.4083 24.4893 58.6121C23.829 57.4019 15.3798 45.6641 1.47054 39.778C-0.0173384 39.1513 2.81842 33.6779 7.14882 35.2559C10.1163 36.3373 18.0063 41.655 19.4356 40.9866C20.5395 40.4699 22.6528 35.8109 22.327 26.2192L21.6683 6.93512C21.6716 6.07697 22.0073 5.25348 22.6049 4.63763C23.2025 4.02178 24.0155 3.6615 24.8732 3.63249C25.7309 3.60347 26.5664 3.90798 27.2043 4.48203C27.8422 5.05609 28.2327 5.85502 28.294 6.71099L28.8711 23.5396C28.925 25.1809 29.437 25.9824 30.3181 25.9656C31.1027 25.9542 31.4132 25.5471 31.5032 24.0022L31.9524 3.80086C31.9616 3.36588 32.0564 2.93698 32.2314 2.53867C32.4065 2.14036 32.6583 1.78046 32.9725 1.47955C33.2868 1.17863 33.6572 0.9426 34.0627 0.784951C34.4682 0.627301 34.9008 0.551124 35.3358 0.560774C35.7715 0.568306 36.2014 0.662027 36.6007 0.836532C37 1.01104 37.3608 1.26287 37.6623 1.57751C37.9638 1.89215 38.2 2.26337 38.3573 2.66975C38.5146 3.07613 38.5899 3.50964 38.5789 3.94527L38.1531 23.1551C38.1184 24.8452 38.3743 25.8303 39.3658 25.7795C39.961 25.7498 40.2133 24.9464 40.3271 24.2075L42.199 6.40634C42.2332 5.96434 42.3556 5.53368 42.559 5.13981C42.7625 4.74593 43.0428 4.39684 43.3835 4.11315C43.7242 3.82946 44.1182 3.61693 44.5424 3.48813C44.9666 3.35933 45.4123 3.31687 45.8532 3.36325C46.2941 3.40963 46.7212 3.54392 47.1093 3.75817C47.4974 3.97243 47.8386 4.26231 48.1128 4.61068C48.387 4.95905 48.5885 5.35884 48.7055 5.78643C48.8226 6.21402 48.8527 6.66073 48.7942 7.10017L47.0724 23.5066C46.8159 25.9166 47.0297 26.8965 47.9829 26.9972C48.9539 27.1045 49.1795 26.3556 49.2779 25.7056L51.3808 11.8502C51.5363 11.0934 51.9762 10.4251 52.61 9.98326C53.2438 9.54138 54.023 9.35961 54.7868 9.47545C55.5507 9.59128 56.2409 9.99589 56.7152 10.6058C57.1895 11.2157 57.4115 11.9844 57.3356 12.7532L55.0431 27.8335L55.045 27.8375L55.0439 27.8405L53.6677 36.883C53.4582 38.6074 53.3362 40.2589 53.3502 41.9262C53.4464 51.7214 48.8512 59.0841 47.6702 60.6099Z" stroke="currentColor"/>
    //                </svg>
    //                Center your hand in the framed area and hold it for a second.
    //            </div>

    //    </div>
    //`;
    this.container = document.getElementById('palmauth');
    this.video = this.container.querySelector('#camvideo');
    //this.overlay = this.container.querySelector('.overlay');
    //this.showOverlay('waiting', 'Waiting...');
    this.palmOutline = this.container.querySelector('.palm-outline');
    this.gestureIndicator = this.container.querySelector('.gesture-indicator');
    this.hintContainer = this.container.querySelector('#hint-container');
    this.hintTextP = this.container.querySelector('#hint-text');
    this.canvas = this.container.querySelector('canvas');
    
    this.scanInstruction = this.container.querySelector('#scan-instruction');
    
    if (this.sidedness == 'right') {
        this.scanInstruction.innerText = 'Scan your right palm';
    } else if (this.sidedness == 'left') {
        this.scanInstruction.innerText = 'Scan your left palm';
    } else {
        this.scanInstruction.innerText = 'Scan your palm';
    }

    this.palmCapture = this.container.querySelector('.palmcapture');
    this.palmCapture.classList.add(this.handSideClass());
};

window.PalmCapture.prototype.showOverlay = function showOverlay(mode, text) {
    this.overlay.text = text;
    this.overlay.classList.remove(...this.overlay.classList);
    this.overlay.classList.add('overlay', mode);   
}

window.PalmCapture.prototype.showHint = function showHint(text, severity) {
    
    this.hintTextP.innerText = text;
    this.hintTextP.className = severity;
    if (text) {
        $(this.hintContainer).show();        
    } else {
        $(this.hintContainer).hide();
    }
}


window.PalmCapture.prototype.handSideClass = function () {
    return 'hand-' + (this.gesture != null ? this.gestureSidedness : (this.sidedness ?? 'any'));
};


window.PalmCapture.prototype.start = async function () {
    try {
        // Todo: Hide overlay here
        await this.openCamera();
        this.onStart();
        await this.capturePalm();
    } catch (error) {
        this.onError(error);
    }
};

window.PalmCapture.prototype.openCamera = async function () {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        this.video.srcObject = stream;
        this.stream = stream;
        
        // Wait for video to be ready
        await new Promise((resolve) => {
        
            this.video.onloadedmetadata = () => {
                resolve();
            };
        });
        
        // Get video dimensions
        const videoTrack = stream.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        console.log('Video size:', settings.width, 'x', settings.height);

        this.videoWidth = this.video.videoWidth;
        this.videoHeight = this.video.videoHeight;
        

        const canvas = this.canvas;
        this.pointxDrawCtx = canvas.getContext('2d');

        this._drawLivenessPoints({ x: 320, y: 240 }, { x: 400, y: 240 });

    } catch (error) {
        throw new Error('Failed to access camera: ' + error.message);
    }
};

window.PalmCapture.prototype._drawLivenessPoints = function (thumbTip, targetPoint) {
    const ctx = this.pointxDrawCtx;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    const current = this._toCanvasPoint(thumbTip);
    ctx.beginPath();
    ctx.arc(current.x, current.y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#2979ff';
    ctx.fill();

    const target = this._toCanvasPoint(targetPoint);
    ctx.beginPath();
    ctx.arc(target.x, target.y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#f6485e';
    ctx.fill();
}

window.PalmCapture.prototype._toCanvasPoint = function(point) {
    const ctx = this.pointxDrawCtx;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    const vw = this.videoWidth;
    const vh = this.videoHeight;

    const scale = (h / w > vh / vw) ? h / vh : w / vw;
    let x = point.x * scale;
    let y = point.y * scale;

    let minX = (vw * scale - w) / 2;
    let minY = (vh * scale - h) / 2;

    x -= minX;
    y -= minY;

    if (x < 0) x = 0;
    if (x > w) x = w;
    if (y < 0) y = 0;
    if (y > h) y = h;
    if (this.isUserFacingCamera) x = w - x;
    return { x: x, y: y };
}

window.PalmCapture.prototype._drawClear = function () {
    const ctx = this.pointxDrawCtx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

window.PalmCapture.prototype.clearLivenessPoints = function() {
    window.requestAnimationFrame(() => this._drawClear());
},
window.PalmCapture.prototype.drawLivenessPoints = function(thumbTip, targetPoint) {
    window.requestAnimationFrame(() => this._drawLivenessPoints(thumbTip, targetPoint));
    }

window.PalmCapture.prototype.capturePalm = async function () {
    try {
        // Initialize palm API if not already initialized
        if (!window.palmAPI) {
            await window.initializePalmAPI();
        }

        this.clearLivenessPoints();
        
        // Start palm capture
        console.log('start capturePalm');
        const result = await window.capturePalm({
            video: this.video,
            sidedness: this.sidedness,
            enrollment: this.enrollment,
            onAdjustment: (text, severity) => {
                if (this.gesture) {
                    return;
                }
                console.log('Adjustment needed:', text, severity);                
                this.showHint(text, severity);
            },          
            onLivenessStart: (gesture, sidedness) => {                
                console.log('onLivenessStart: ', gesture, sidedness);
                this.gesture = gesture;
                this.gestureSidedness = sidedness;                
                this.showHint('Make gesture', AdjustmentSeverity.ok);

            },
            onLivenessGesture: (gesture, sidedness) => {
                console.log('onLivenessGesture: ', gesture, sidedness);
                this.gesture = gesture;
                this.gestureSidedness = sidedness;                
                this.showHint('Make gesture', AdjustmentSeverity.ok);

            },
            onLivenessTouchPoints: (thumbTip, targetPoint) => {
                console.log('onLivenessTouchPoints: ', thumbTip, targetPoint);
                this.drawLivenessPoints(thumbTip, targetPoint);                
                this.showHint('Touch dots and hold', AdjustmentSeverity.ok);
            },
        });

        
        this.clearLivenessPoints();        
        this.showHint('Matching...', AdjustmentSeverity.ok);
        //this.onModel(result);
        

        await matchPalmId(result);       

    } catch (e) {        
        if (e instanceof WrongPalmError) {
            
            this.showHint('Show the other palm', 'error');
            setTimeout(() => this.start(), 2000);
            return;
        } else if (e instanceof LivenessError) {
            this.hintText = null;

            this.showHint('Liveness failed', 'error');
            setTimeout(() => this.start(), 2000);
            return;
        } else {
            console.error(e);
        }
    }
};

window.PalmCapture.prototype.stop = function () {
    if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.video.srcObject = null;
    }
};

