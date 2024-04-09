function generateCDNLink() {
    var inputUrls = document.getElementById("urlInput").value.trim().split(/\s+/);
    var cdnLinks = [];

    for (var i = 0; i < inputUrls.length; i++) {
        var inputUrl = inputUrls[i].trim();
        var cdnLink = "";

        if (inputUrl.startsWith("https://github.com/") && inputUrl.includes("/blob/")) {
            cdnLink = inputUrl.replace("https://github.com/", "https://cdn.jsdelivr.net/gh/");
            cdnLink = cdnLink.replace("/blob/", "/");
            cdnLink = cdnLink.replace("/main/", "/"); 
        } else if (inputUrl.startsWith("https://raw.githubusercontent.com/")) {
            var parts = inputUrl.split("/");
            var userRepo = parts[4] + "/" + parts[5];
            var filename = parts.slice(6).join("/");
            cdnLink = "https://cdn.jsdelivr.net/gh/" + userRepo + "/" + filename;
        } else {
            cdnLink = "Invalid URL";
        }

        cdnLinks.push(cdnLink);
    }

    document.getElementById("generatedLink").value = cdnLinks.join(' ');
}


function copyLinkToClipboard() {
    var linkInput = document.getElementById("generatedLink");
    linkInput.select();
    document.execCommand("copy");
}

document.getElementById("urlInput").addEventListener("input", generateCDNLink);

