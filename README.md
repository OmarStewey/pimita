# PIMita
This is a script for people working with Privileged Identity Management in Azure. If you have to frequently request PIM access to multiple roles, this will basically activate all roles for you via browser dev console. It's clunky but works in cases where you may not have api access.

## About
Script to submit PIM requests for all available roles.

## Usage
- Navigate / Login to the Azure Portal.
- Launch your Browser's Developer Tools > Console. (usually F12)
- Copy and paste the contents of index.js.
- Update the reason variable (*optional*).
- Hit Enter to run the srcript
- Monitor the console for logging.

### About Privileged Identity Management
https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/
