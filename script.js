document.addEventListener('DOMContentLoaded', () => {
    const arScene = document.getElementById('ar-scene');
    const officeMap = document.getElementById('office-image'); // Note: Updated reference
    const startBtn = document.getElementById('start-btn');
    const directionsBtn = document.getElementById('directions-btn');
    const mapStatus = document.getElementById('map-status');

    let isScanning = false;

    // --- Initial Setup ---
    const setupScene = async () => {
        try {
            // Wait for the XR session to be ready
            await arScene.requestXRSession({
                optionalFeatures: ['room-scale-tracking'],
                // This flag is critical for Meta VR
                vrMode: 'immersive-vr'
            });

            // Enable AR world loading
            if (officeMap.src === "") {
                officeMap.src = '/ar-worlds/default-start-glue.glb';
            }
        } catch (error) {
            console.error("Error setting up the scene:", error);
            mapStatus.textContent = "Error: Could not initialize AR. Please try again.";
        }
    };

    // --- AR Map Control ---
    const handleMapBuilt = () => {
        console.log("AR map built successfully!");
        isScanning = false;
        startBtn.disabled = false;
        startBtn.textContent = "Rescan";
        mapStatus.textContent = "Map Ready";
        
        // In a real app, you would save the built map data
        // For now, we just enable the directions button
        directionsBtn.disabled = false;
    };

    const startScanning = () => {
        if (isScanning) return;
        
        isScanning = true;
        startBtn.disabled = true;
        startBtn.textContent = "Processing...";
        mapStatus.textContent = "Building 3D Map... This may take 5-10 seconds.";

        // Trigger the SLAM process
        officeMap.autoplay = true;
        
    };

    const stopScanning = () => {
        isScanning = false;
        startBtn.disabled = false;
        startBtn.textContent = "Start Scan";
        mapStatus.textContent = "Ready";
        
        // Optionally, clear any active scanning
        officeMap.autoplay = false;
    };

    // --- Directions Logic ---
    const getDirections = () => {
        console.log("Getting directions...");
        
        /* 
          In a real app, this would use the user's current pose 
          and map data to generate directions.
          For now, we just show a confirmation.
          */
        alert("AR Directions are in development!");
    };

    // --- Event Listeners ---
    startBtn.addEventListener('click', () => {
        if (isScanning) return stopScanning();
        else startScanning();
    });

    directionsBtn.addEventListener('click', getDirections);

    // Initialize the scene
    setupScene();
});


