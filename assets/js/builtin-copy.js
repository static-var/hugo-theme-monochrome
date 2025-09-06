function registerHoverEvent(wrapper, button) {
    wrapper.addEventListener('mouseenter', function () {
        button.classList.remove("hidden");
    });
    wrapper.addEventListener('mouseleave', function () {
        button.classList.add("hidden");
    });
}

function registerTouchedEvent(pre, button) {
    pre.addEventListener("touchend", function () {
        if (button.classList.contains("hidden")) {
            button.classList.remove("hidden");
        } else {
            button.classList.add("hidden");
        }
    });
}

function registerClipboard(button, code_block) {
    button.addEventListener('click', async function () {
        try {
            await navigator.clipboard.writeText(code_block.innerText);
            button.blur();
            button.innerText = 'Copied!';
            setTimeout(function () {
                button.innerText = 'Copy';
            }, 2000);
        } catch (e) {
            button.innerText = 'Error';
        }
    });
}

window.addEventListener("DOMContentLoaded", function () {
    // Handle Hugo Chroma code blocks with table structure
    document.querySelectorAll('.highlight').forEach((highlight) => {
        // Find the code element in the second table cell (first is line numbers)
        var code_block = highlight.querySelector('td:last-child pre > code');
        if (!code_block) {
            // Fallback for non-table structure
            code_block = highlight.querySelector('pre > code');
        }
        
        if (code_block) {
            var button = document.createElement('span');
            button.className = 'copy-code-button hidden';
            button.type = 'button';
            button.innerText = 'Copy';
            
            highlight.appendChild(button);
            registerHoverEvent(highlight, button);
            
            var pre = code_block.parentNode;
            registerTouchedEvent(pre, button);
            registerClipboard(button, code_block);
        }
    });
    
    // Also handle standalone pre > code blocks (not in highlight divs)
    document.querySelectorAll('pre:not(.emgithub-pre) > code').forEach((code_block) => {
        var pre = code_block.parentNode;
        
        // Skip if already inside a highlight block (handled above)
        if (pre.closest('.highlight')) {
            return;
        }
        
        var button = document.createElement('span');
        button.className = 'copy-code-button hidden';
        button.type = 'button';
        button.innerText = 'Copy';
        
        var wrapper = document.createElement('div');
        wrapper.style = "position: relative;"
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(button);
        registerHoverEvent(wrapper, button);
        registerTouchedEvent(pre, button);
        registerClipboard(button, code_block);
    });
});
