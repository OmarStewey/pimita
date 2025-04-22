(function () {

    var reason = "Solution Development";

    var activateButtons = document.querySelectorAll(".ext-aad-role-grid-activate-deactivate-btn");
    var numberOfRoles = activateButtons.length;
    
    // Check to make sure we're on a valid PIM page
    if(numberOfRoles == 0){
        alert("Opening up PIM Pages. Please run this script again once you get there. Good luck!");
        window.open('https://portal.azure.us/?feature.msaljs=false#view/Microsoft_Azure_PIMCommon/ActivationMenuBlade/~/azurerbac/provider/azurerbac');
        location.href= 'https://portal.azure.us/?feature.msaljs=false#view/Microsoft_Azure_PIMCommon/ActivationMenuBlade/~/aadmigratedroles';
        return;
    }
        
    var selectors = {
        submitActivationButton: ".fxs-contextpane div[role='button'][title='Activate']",
        reasonField: ".fxs-contextpane .ext-activate-tab-reason-text-field textarea",
        progressBar: ".fxs-contextpane .fxs-bladecontent-progress",
        panelCloseButton: ".fxs-contextpane button.fxs-blade-close",
        panelTitle: ".fxs-contextpane .fxs-blade-title-titleText",
    }

    async function activateRole(currentRole = 0) {

        if (currentRole >= numberOfRoles) {
            console.log('Activation complete!😃🏁');
            return;
        }

        activateButtons[currentRole].click();

        // wait for panel load
        await waitForElement(selectors.submitActivationButton).then(() => {

            // set reason
            var reasonField = document.querySelector(selectors.reasonField);
            reasonField.value = reason;
            reasonField.dispatchEvent(new Event('change'));

            // activate
            var submitActivationButton = document.querySelector(selectors.submitActivationButton);
            submitActivationButton.click();
            var sub = activateButtons[currentRole].closest('tr').querySelectorAll('td')[1].innerText;
            console.log(sub + " - " + document.querySelector(selectors.panelTitle).textContent + " request submitted. ✅"); 

            // wait before closing
            setTimeout( () => { 
                
                // close panel if it exists
                // if it doesn't, the pim request probably failed
                if(!!document.querySelector(selectors.panelCloseButton)){
                    document.querySelector(selectors.panelCloseButton).click();
                }else {                
                    console.log("❌ Request failed. Maybe you had access already? 🤷‍♂️");
                }
                currentRole++;
                activateRole(currentRole); 
                
                }, 8000 
            );
            
        })
    }

    function waitForElement(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    if (doneLoading()) {
                        observer.disconnect();
                        resolve(document.querySelector(selector));
                    }
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    function doneLoading() {
        return (
            !document.querySelector(selectors.progressBar).checkVisibility()
            && !!document.querySelector(selectors.reasonField) 
            && !document.querySelector(selectors.reasonField).readOnly
            && !!document.querySelector(selectors.submitActivationButton)
            && document.querySelector(selectors.submitActivationButton).getAttribute('aria-disabled') !== 'true'
        )

    }
    activateRole();
    clear();
    console.log("Alright, getting started, please stand by... ☕");
})();
