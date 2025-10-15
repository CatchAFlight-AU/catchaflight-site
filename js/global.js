document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ Global.js Loaded");

    // Function to load external HTML content safely
    async function loadComponent(containerSelector, filePath, successMessage) {
        const container = document.querySelector(containerSelector);

        if (!container) {
            console.warn(`⚠️ Container not found: ${containerSelector}`);
            return;
        }

        try {
            // Check if it's already loaded (avoids infinite fetch loops)
            if (container.dataset.loaded === "true") {
                console.log(`⚠️ ${filePath} already loaded, skipping fetch.`);
                return;
            }

            const response = await fetch(filePath, { cache: "no-cache" });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const html = await response.text();
            container.innerHTML = html;
            container.dataset.loaded = "true"; // Mark as loaded
            console.log(successMessage);

            // Dispatch event after loading
            if (containerSelector === "#header-container") {
                document.dispatchEvent(new Event("headerLoaded"));
            }
            if (containerSelector === "#footer-container") {
                document.dispatchEvent(new Event("footerLoaded"));
            }
        } catch (error) {
            console.error(`❌ Failed to load ${filePath}:`, error);
        }
    }

    // Load Header and Footer only ONCE
    await loadComponent("#header-container", "/pages/header.html", "✅ Header Loaded");
    await loadComponent("#footer-container", "/pages/footer.html", "✅ Footer Loaded");
});
