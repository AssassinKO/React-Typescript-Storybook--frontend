(in the designs ignore all YELLOW info boxes that comes from the manager)  

For now we only will work in the homeproved.PRO (http://localhost:3001/)

#WIDGETS:

All these widgets will come from an external website, so we only need to show the info on this website. It works via Iframe they have to put on their own website.  
Site is multilanguage dutch/french, so we make use of translation code, i will translate them later. (you can always add some dutch text as shown in the designs for testing)  
Also mobile friendly.

- Menu item "widgets" (This is already there but isn't linked)
- Page showing an overview of all available widgets ( https://xd.adobe.com/view/c5e8da60-79c7-4f01-965f-4210499f728a-90bb/ )
    * all widgets will use a preview/dummy image for now (maybe later we want to show the real Homeproved-Score in this using API (`/api/companies/{company}/score`) so maybe already build a full HTML/CSS component for each widget so we can easy replace the score later)
    * Only the QR-code is the real generated QR-code
    * all widgets are clickable and will go to their detail page with install info
- Detail page for each widget ( https://xd.adobe.com/view/c5e8da60-79c7-4f01-965f-4210499f728a-90bb/screen/7b56aace-514b-46ac-8fb4-81ba9f6c5a04/ )
    * Only the "small" widget has 2 color options, light/dark. When you switch this, the preview image must also switch and also the installation info will have another html param in step2
    * When clicking in the "install" button the steps will show instead of the default info text. ( https://xd.adobe.com/view/c5e8da60-79c7-4f01-965f-4210499f728a-90bb/screen/fae284d0-3f5f-4854-93ce-90b65c9bfb19/ )  
      (for this example the buttons of the small widget Light/Dark can be the same as other design with the "slider" in gradient color)
    * Step 1 will always contain our default js file they must use (i will add the url later, this doesn't work yet)
    * Step 2 will have different HTML tag for each widget, and also a custom tag depending on the color choose.  
      exampele of the old website was:  
      Step 1 : `<script src="https://static.homeproved.com/widgets/js/latest.js"></script>`  
      Step 2 : `<div class="homeproved-widget" data-widgetid="3" data-clientid="6932" data-format-width="300px" data-format-height="120px" data-theme="theme1" data-bgcolor="#FFFFFF" style="position: relative;"></div>`  
      Tags:  
      data-widetid : is unique ID for each widget (so will have 1-6 numbers for now since we have 6 widgets, QR-code is only downloadable)  
      data-clientid : is the company ID of the current logged in user/company  
      data-theme : is variable depending on the color, but this tagname can change for the new website.  
      optional parameters can be data-width, data-height, data-bgcolor.  
- "Share instructions" button can be ignored/deleted for now, we won't provide a share link yet. Only show the green info balloon can be shown.
- QR-code is a simple generated QR-code of the public .COM company URL (`http://localhost:3000/{company-url-name}`) but added an extra url query param so we can track/control this for analytics and also redirect the url when needed. So final url will be something like `http://localhost:3000/{company-url-name}/qr-code` for example
    * We will add a QR-page-counter field in database, so an API call (current PATCH) will be provided where you can
    * Then url must then redirect to the normal company page (`http://localhost:3001/{company-url-name}`)
    * There will also be a database field that will say if this company can use the QR-code yes/no, when the option is disabled the url must redirect to the homepage (`http://localhost:3000/`) instead of the company page.
    * Both those fields will be available using the GET company API (`/api/companies/{company}`)


## COMPANY FICHE:

https://xd.adobe.com/view/c5e8da60-79c7-4f01-965f-4210499f728a-90bb/screen/00f589be-554c-449b-b697-594a000d297a/ (desktop: sometimes the preview background shows gray instead of white in XD, but the background must be white)  
https://xd.adobe.com/view/c5e8da60-79c7-4f01-965f-4210499f728a-90bb/screen/b3a52b9c-07a9-4f6e-b806-b442028e6795/ (mobile)

Create a page that shows a "A4 printable fiche" of the company. This can then be directly printed or downloaded (PDF)

- Menu item "bedrijfsfiche" (already there not linked yet)
- Page showing the preview with real company data and be able to directly print this or download (PDF):
    * company header, logo, score
    * company contact info + QR-code of the public url http://localhost:3000/{company-url-name}/qr-code
    * categories
    * labels
    * 6 favorite/latest reviews