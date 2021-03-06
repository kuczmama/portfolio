var animateCSSDSN = "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css",
    stickyJSCDN = "https://cdnjs.cloudflare.com/ajax/libs/jquery.sticky/1.0.4/jquery.sticky.min.js",
    widgetClosed=false,
    barOn = false;

if (function($) {
        /*
         Are we on a product page? If so, return true.
         */
        function onProductPage(){
            return window.location.href.indexOf("/products/");
        }

        function getShopifyDomain(){
            var page_scripts = document.getElementsByTagName("script"), sourceURL="", shopify_domain="";
            for(var i=0;i< page_scripts.length;i++){
                if ((sourceURL = page_scripts[i].getAttribute("src")) && (sourceURL = sourceURL.match(/^(.*)better-sticky-button.js(\?\s*(.+))?\s*/))) {
                    shopify_domain = sourceURL[3].match(/shop=(.+).myshopify.com/)[1];
                    break;
                }
            }

            return shopify_domain + ".myshopify.com";
        }

        function getServerAddress(){
            return "https://c72a0e96.ngrok.io";
        }

        /*
         Are we on mobile? If so, return true.
         */
        function onMobile(){
            return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) && (screen == null || null !=screen && screen.width < 768)
        }

        /*
         Append stylesheets, scripts and grab the product details
         */
        function setupEnv(shopifyProduct, shopSettings){

            //Append stylesheets and scripts
            $("head").append('<link rel="stylesheet" href="https://www.mkucz.com/assets/css/shopify/better-sticky-button.css" type="text/css" />');

            if($("link[href*='animate.min.css']").length == 0 && $("link[href*='animate.css']").length == 0){
                $("head").append('<link rel="stylesheet" href="' + animateCSSDSN + '?v0.1" type="text/css" />');
            }

            var fixedProductId = shopifyProduct.product.id,fixedProductDetails = shopifyProduct.product;

            fixedVars = {
                shopURL:window.location.hostname,
                onMobile:onMobile(),
                pulseButton:shopSettings["pulse_button"],
                animationType:shopSettings["animation_type"],
                customCSS:shopSettings["custom_css"],
                buyButtonText:shopSettings["buy_button_text"],
                directToCheckout:shopSettings["direct_to_checkout"],
                designTemplate: onMobile() ? "mobile" : "responsive",
                htmlPrices:shopSettings["html_prices"],
                productId : fixedProductId,
                productTitle : fixedProductDetails.title.replace(/<(?:.|\n)*?>/gm, ""),
                productVariantName : fixedProductDetails.variants.length > 1 ? fixedProductDetails.variants[0].title.replace(/<(?:.|\n)*?>/gm, "") : "",
                productVariants : fixedProductDetails.variants,
                productPrice : (fixedProductDetails.variants)[0].price,
                productCompareAtPrice : (fixedProductDetails.variants)[0].compare_at_price,
                productImage : fixedProductDetails.images.length > 0 ? fixedProductDetails.images[0].src : "",
                priceSelector : shopSettings["price_selector"],
                originalPriceSelector : shopSettings["original_price_selector"],
                buyButtonSelector : $(shopSettings["buy_button_selector"]).length ? shopSettings["buy_button_selector"] : "form[action^='/cart/add']:first button:visible:last",
                reviewStarsSelector : shopSettings["review_stars_selector"],
                formSelector : shopSettings["form_selector"],
                variantSelector: shopSettings["variant_selector"],
                styleBarTextColor: shopSettings["style_bar_text_color"],
                styleButtonTextColor: shopSettings["style_button_text_color"],
                styleBarBackgroundColor: shopSettings["style_bar_background_color"],
                styleButtonBackgroundColor: shopSettings["style_button_background_color"],
                currencySymbol: shopSettings["currency_symbol"],
                useCustomStyles: shopSettings["use_custom_styles"],
                desktopSettings:{
                    desktopEnabled:shopSettings["desktop_enabled"],
                    desktopDesign:shopSettings["desktop_design_template"],
                    barPosition:shopSettings["desktop_bar_position"],
                    positionOffset:!shopSettings["desktop_position_offset"] ? 0 : shopSettings["desktop_position_offset"],
                    revealAt:shopSettings["desktop_reveal_at"],
                    showVariants:shopSettings["desktop_variants"],
                    paymentOptions:shopSettings["desktop_payment_options"],
                    socialShare:shopSettings["desktop_social_share"],
                    directToCheckout:shopSettings["desktop_direct_to_cart"],
                    buyNowButtonText:shopSettings["buy_button_text"],
                    zindex:shopSettings["desktop_z_index"],
                    paddingLeft:shopSettings["desktop_padding_left"],
                    paddingRight:shopSettings["desktop_padding_right"],
                    desktopOpacity:shopSettings["desktop_opacity"],
                    showQuantity:shopSettings["desktop_show_quantity"],
                    showCompareAt:shopSettings["desktop_show_compare_at"]},
                mobileSettings:{
                    mobileEnabled:shopSettings["mobile_enabled"],
                    mobileDirectToCheckout:shopSettings["mobile_direct_to_checkout"],
                    mobileDesign:shopSettings["mobile_design_template"],
                    mobileOpacity:shopSettings["mobile_opacity"],
                    barPosition:shopSettings["mobile_bar_position"],
                    positionOffset:!shopSettings["mobile_position_offset"] ? 0 : shopSettings["mobile_position_offset"],
                    revealAt:shopSettings["mobile_reveal_at"],
                    showCompareAt:shopSettings["mobile_show_compare_at"],
                    zindex:shopSettings["mobile_z_index"],
                    showQuantity:shopSettings["show_quantity_on_mobile"],
                    showVariants:shopSettings["show_variants_on_mobile"]},
            };

            if(fixedVars.mobileSettings.revealAt == "addtocart"){
                fixedVars.mobileSettings.revealAt = $(fixedVars.buyButtonSelector).position().top;
            }

            if(fixedVars.desktopSettings.revealAt == "addtocart"){
                fixedVars.desktopSettings.revealAt = $(fixedVars.buyButtonSelector).position().top;
            }

            //Append the custom CSS
            if(fixedVars.customCSS!=""){
                $("head").append('<style>' + fixedVars.customCSS + '</style>');
            }

            return fixedVars;
        }


        function getCurrentVariantId(fixedVars){
            var currentVariant = (location.search).match(/variant=([0-9]+)/);

            //If the URL contains a variant ID, return that
            if(currentVariant!=null){
                return currentVariant[1];

                //Otherwise return the first variant's ID
            }else{
                return fixedVars.productVariants[0].id;
            }
        }

        function getCurrentVariantTitle(fixedVars){

            var variantTitle="";

            $(fixedVars.productVariants).each(function(){
                if(this.id==getCurrentVariantId(fixedVars)){
                    variantTitle = this.title;
                }
            });

            return variantTitle;
        }

        function createVariantSelect(fixedVars){
            var variantFields = $(fixedVars.variantSelector).clone();
            var newSelectField = "";
            var newSelectFields = [];
            var printSelected = "";
            var currentVariantValue = getCurrentVariantTitle(fixedVars);

            //If radio buttons are present, convert into a select field first
            if(variantFields.find("[type=radio]").length > 0){

                $(fixedVars.variantSelector).each(function(arrayIndex, item){
                    var fieldAttributes = "";

                    //If there's a data-option attribute
                    if($(item).attr("data-option")){ fieldAttributes = " data-option='" + $(item).attr("data-option") + "' ";}

                    //If there's a data-index attribute
                    if($(item).attr("data-index")){ fieldAttributes += " data-index='" + $(item).attr("data-index") + "' ";}

                    //If there's a name attribute
                    if($(item).attr("name")){ fieldAttributes += " name='" + $(item).attr("name") + "' ";}

                    newSelectField = $("<select " + fieldAttributes + "></select>");

                    //Convert radio buttons into select field options
                    $(item).find("input[type=radio]").each(function(arrayIndex, item) {

                        fieldAttributes="";

                        printSelected="";

                        if($(item).attr("value") == currentVariantValue){var printSelected="SELECTED"}
                        if($(item).prop("checked")){var printSelected="SELECTED"}

                        //If there's a data-option attribute
                        if($(item).attr("data-option")){ fieldAttributes = " data-option='" + $(item).attr("data-option") + "' ";}

                        //If there's a data-index attribute
                        if($(item).attr("data-index")){ fieldAttributes += " data-index='" + $(item).attr("data-index") + "' ";}

                        //Append the option to the select field
                        newSelectField.append("<option " + fieldAttributes + " value='" + $(item).attr("value") + "' " + printSelected + ">" + $(item).attr("value") + "</option>");

                    });

                    newSelectFields.push(newSelectField);
                });
                variantFields = newSelectFields.reverse();

            }else{

                //Apply selected option to clonsed version
                $(fixedVars.variantSelector).each(function(i){

                    variantFields.eq(i).val($(this).val());

                });
            }

            return variantFields;

        }


        function attachVariantEventListeners(fixedVars){

            //If radio buttons were present on the page, update our select dropdown when there's a change
            if($(fixedVars.variantSelector).find("[type=radio]").length > 0){


                //Update the shopify page when the visitor chooses a variant on the bar
                $(".fixedBuyBarVariants select").change(function(){

                    var radioButtons = $(fixedVars.variantSelector).find("input[data-option=" + $(this).data("option") + "], input[data-index=" + $(this).data("index") + "], input[name='" + ($(this).attr("name") ? $(this).attr("name").replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1") : "") + "']");

                    //jQuery("div.swatch-element.available" + jQuery(this).val().toLowerCase()).trigger("click");

                    var selectedValue = $(this).val();

                    $(radioButtons).each(function(index, item){
                        if(selectedValue==$(item).val()){
                            $(item).prop("checked", true);
                            $(item).change();
                        }
                    });

                    updateCheckoutURLButton(fixedVars);
                    updatePriceInBar(fixedVars);
                });

                $("body").on("change", ".radio-wrapper fieldset input,  .product__available-sizes:first input, .product__available-colors:first input", function() {

                    //Get the select dropdown that changed
                    var changedDropdown = $(".fixedBuyBarVariants select[data-option=" + $(this).data("option") + "], .fixedBuyBarVariants select[data-index=" + $(this).data("index") + "], .fixedBuyBarVariants select[name='" + ($(this).attr("name") ? $(this).attr("name").replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1") : "") + "']");

                    //Update it's value to the value of the radio button that was checked
                    $(changedDropdown).val($(this).val());

                    updateCheckoutURLButton(fixedVars);
                    updatePriceInBar(fixedVars);
                });

            }else{

                //If the variant dropdown in our bar changes...
                $(".fixedBuyBarVariants select").change(function() {

                    //jQuery("div.swatch-element.available" + jQuery(this).val().toLowerCase()).trigger("click");

                    //we're also changing the value of the original one on the page then triggering the change event on it.
                    $("#" + $(this).attr("id")).val($(this).val());
                    $("#" + $(this).attr("id")).change();

                    updateCheckoutURLButton(fixedVars);
                    updatePriceInBar(fixedVars);
                });


                $("body").on("change", fixedVars.variantSelector + ", " + fixedVars.variantSelector + " input, " + fixedVars.variantSelector + " select", function() {

                    //if the change happens to a radio button, make it checked
                    if($("#" + $(this).attr("id")).attr("type") == "radio" && $("#" + $(this).attr("id")).prop("checked")){
                        $(".fixedBuyBarVariants #" + $(this).attr("id")).prop("checked", true);
                    }

                    //now set the value of the sticky bar variant selector to the same as the one on the page
                    $(".fixedBuyBarVariants #" + $(this).attr("id")).val($(this).val());

                    updateCheckoutURLButton(fixedVars);
                    updatePriceInBar(fixedVars);
                });

            }

        }

        function formatPrice(currencySymbol, price){
            if(currencySymbol.indexOf("{{amount_no_decimals}}") !== -1){
                return currencySymbol.replace("{{amount_no_decimals}}",Math.round(price));
            }else if(currencySymbol.indexOf("{{amount_with_comma_separator}}") !== -1){
                return currencySymbol.replace("{{amount_with_comma_separator}}",price.replace(".",","));
            }else if(currencySymbol.indexOf("{{amount_no_decimals_with_comma_separator}}") !== -1){
                return currencySymbol.replace("{{amount_no_decimals_with_comma_separator}}",(Math.round(price)).replace(".",","));
            }else if(currencySymbol.indexOf("{{amount_with_apostrophe_separator}}") !== -1){
                return currencySymbol.replace("{{amount_with_apostrophe_separator}}",price.replace(".","'"));
            }else if(currencySymbol.indexOf("{{amount_no_decimals_with_space_separator}}") !== -1){
                return currencySymbol.replace("{{amount_no_decimals_with_space_separator}}",(Math.round(price)).replace(","," "));
            }else if(currencySymbol.indexOf("{{amount_with_space_separator}}") !== -1){
                return currencySymbol.replace("{{amount_with_space_separator}}",price.replace("."," "));
            }else{
                return currencySymbol.replace("{{amount}}",price);
            }
        }

        function updatePriceInBar(fixedVars){

            var priceCode,originalPriceCode,productTitle = fixedVars.productTitle;



            for (var i = 0, len = fixedVars.productVariants.length; i < len; i++) {
                if(fixedVars.productVariants[i].id == getCurrentVariantId(fixedVars)){
                    priceCode = formatPrice(fixedVars.currencySymbol, fixedVars.productVariants[i].price);
                    if(fixedVars.productVariants[i].title != "Default Title"){
                        productTitle = fixedVars.productTitle + " - " + fixedVars.productVariants[i].title;
                    }
                    productTitle = fixedVars.productTitle + " - " + fixedVars.productVariants[i].title;
                    if(fixedVars.productVariants[i].compare_at_price == null || fixedVars.productVariants[i].compare_at_price == "" || fixedVars.productVariants[i].price > fixedVars.productVariants[i].compare_at_price){
                        originalPriceCode = "";
                    }else{
                        originalPriceCode = formatPrice(fixedVars.currencySymbol,fixedVars.productVariants[i].compare_at_price);
                        if(getShopifyDomain() == "shopluvit.myshopify.com"){originalPriceCode="";}
                    }
                }
            }

            if(getShopifyDomain() == "hobbieshut.myshopify.com"){
                //Update the price
                $(".fixedBuyBarPrice").html($(fixedVars.priceSelector).html());

                if($(fixedVars.originalPriceSelector)){
                    //Update the original price
                    $(".fixedBuyBarOriginalPrice").html($(fixedVars.originalPriceSelector).html());
                }else{
                    $(".fixedBuyBarOriginalPrice").html("");
                }
            }else{
                //Update the price
                $(".fixedBuyBarPrice").html(priceCode);

                //Update the original price
                $(".fixedBuyBarOriginalPrice").html(originalPriceCode);
            }

            //Update the title
            $(".fixedBuyBarProductTitle a:first").text(productTitle);
        }

        function createDirectToCheckoutURL(fixedVars){
            var quantity=1;

            if($(fixedVars.formSelector + " input[name=quantity]").length > 0){
                quantity = $(fixedVars.formSelector + " input[name=quantity]").val();
            }

            return "https://" + fixedVars.shopURL +  "/cart/" + getCurrentVariantId(fixedVars) + ":" + quantity;
        }

        // sleep time expects milliseconds
        function sleep (time) {
            return new Promise(function(resolve){setTimeout(resolve, time)});
        }

        function updateCheckoutURLButton(fixedVars){
            if(fixedVars.directToCheckout==true){
                $(".fixedBuyBarButton input, .fixedBuyBarButton button").click(function(){
                    window.location.replace(createDirectToCheckoutURL(fixedVars));
                });
            }

            // Usage!
            sleep(250).then(function(){
                $(".fixedBuyBarButton input, .fixedBuyBarButton button").prop("disabled",$(fixedVars.buyButtonSelector).prop("disabled"));

                if(!$(fixedVars.buyButtonSelector).prop("disabled")){
                    $(".fixedBuyBarButton input, .fixedBuyBarButton button").css("cursor","pointer");
                }else{
                    $(".fixedBuyBarButton input, .fixedBuyBarButton button").css("cursor","default");
                }

                if(!fixedVars.useCustomStyles){
                    $(".fixedBuyBarButton input, .fixedBuyBarButton button").css("background-color",$(fixedVars.buyButtonSelector).css("background-color"));
                    $(".fixedBuyBarButton input, .fixedBuyBarButton button").css("color",$(fixedVars.buyButtonSelector).css("color"));
                    $(".fixedBuyBarButton input, .fixedBuyBarButton button").css("border",$(fixedVars.buyButtonSelector).css("border"));
                }
            });
        }

        /*
         Create the bar and append to the page
         */
        function createBar(fixedVars){

            var buyButtonCode = $(fixedVars.buyButtonSelector).clone().text(fixedVars.buyButtonText),
                reviewStars =  $(fixedVars.reviewStarsSelector).length != 0 ? $(fixedVars.reviewStarsSelector).html() : "",
                priceCode = "",
                originalPriceCode = "",
                currentVariant;

            var productTitle = fixedVars.productTitle;

            if(buyButtonCode.is("input")){
                buyButtonCode.val(fixedVars.buyButtonText);
            }

            for (var i = 0, len = fixedVars.productVariants.length; i < len; i++) {
                if(fixedVars.productVariants[i].id == getCurrentVariantId(fixedVars)){
                    if(fixedVars.productVariants[i].price != null){
                        priceCode = formatPrice(fixedVars.currencySymbol, fixedVars.productVariants[i].price);
                    }
                    if(fixedVars.productVariants[i].compare_at_price != null && parseInt(fixedVars.productVariants[i].price) < parseInt(fixedVars.productVariants[i].compare_at_price)){
                        originalPriceCode = formatPrice(fixedVars.currencySymbol, fixedVars.productVariants[i].compare_at_price);
                        if(getShopifyDomain() == "shopluvit.myshopify.com"){originalPriceCode="";}
                    }
                    if(fixedVars.productVariants[i].title != "Default Title" && fixedVars.productVariants[i].title != "Default"){
                        productTitle = fixedVars.productTitle + " - " + fixedVars.productVariants[i].title;
                    }
                }
            }

            var displayVariants=false, variantCode = [];

            if(fixedVars.productVariants.length > 1 && ((fixedVars.onMobile && fixedVars.mobileSettings.mobileDesign == "full") || (!fixedVars.onMobile && fixedVars.desktopSettings.showVariants) || (!fixedVars.onMobile && fixedVars.desktopSettings.barPosition == "right"))){
                variantCode = createVariantSelect(fixedVars);
                displayVariants=true;
            }

            if(onMobile()){
                switch (fixedVars.mobileSettings.mobileDesign) {
                    case "mobile":
                        $("body").append("<div id='fixedBuyBar' class='mobile'><div class='fixedBuyBarButton'></div></div>");
                        break;
                    case "full":
                        $("body").append("<div id='fixedBuyBar' class='full'><div class='fixedBuyBarVariants'></div><div class='fixedBuyBarButton'></div><div class='fixedBuyBarConfirm'>Product Added!</div><div class='fixedBuyBarPrice'>" + priceCode + "</div><div class='fixedBuyBarOriginalPrice'>" + originalPriceCode + "</div></div>");
                        break
                }
            }else{
                if(fixedVars.desktopSettings.barPosition == "right" || fixedVars.desktopSettings.barPosition == "left"){
                    $("body").append("<div id='fixedBuyBar' class='" + fixedVars.desktopSettings.barPosition + "'><div class='fixedBuyBarThumbClose'><a href='#'>[x]</a></div><div class='fixedBuyBarThumb'><img src='" + fixedVars.productImage + "'></div><div class='fixedBuyBarProductTitle'><a href='#'>" + productTitle + "</a><div class='fixedBuyBarReviews'>" + reviewStars + "</div></div><div class='fixedBuyBarVariants'><div class='fixedBuyBarPrice'>" + priceCode + "</div></div><div class='fixedBuyBarButton'></div><div class='fixedBuyBarConfirm'>Product Added!</div></div>");
                }else{
                    $("body").append("<div id='fixedBuyBar' class='desktop'><div class='fixedBuyBarThumb'><img src='" + fixedVars.productImage + "'></div><div class='fixedBuyBarProductTitle'><a href='#'>" + productTitle + "</a><div class='fixedBuyBarReviews'>" + reviewStars + "</div></div><div class='fixedBuyBarButton'></div><div class='fixedBuyBarConfirm'>Product Added!</div><div class='fixedBuyBarPrice'>" + priceCode + "</div><div class='fixedBuyBarOriginalPrice'>" + originalPriceCode + "</div><div class='fixedBuyBarVariants'></div></div>");
                }
            }

            //Place the add to cart button code
            $(".fixedBuyBarButton").html(buyButtonCode);

            //Hide compare at price
            if(!fixedVars.desktopSettings.showCompareAt && !(onMobile() && fixedVars.mobileSettings.mobileDesign == "full")){
                $("#fixedBuyBar.desktop div.fixedBuyBarOriginalPrice").remove();
            }

            //Place in the quantity selector
            if((fixedVars.desktopSettings.showQuantity && !onMobile()) || (onMobile() && fixedVars.mobileSettings.mobileDesign == "full" && fixedVars.mobileSettings.showQuantity) || (!onMobile() && fixedVars.desktopSettings.barPosition == "right")){

                //If the page already has a quantity selector
                if($(fixedVars.formSelector + " input[name=quantity]").length != 0){
                    //clone it in

                    if(getShopifyDomain() == "shopluvit.myshopify.com"){
                        $("#fixedBuyBar").append("<div class='fixedBuyBarQuantity'>" + $(fixedVars.formSelector + " input[name=quantity]").clone().prop('outerHTML') + "</div>");
                    }else{
                        $("div.fixedBuyBarVariants").prepend($(fixedVars.formSelector + " input[name=quantity]:first").clone());
                    }


                    //If not...
                }else{
                    //add in the hidden
                    $(fixedVars.formSelector).append('<input type="hidden" id="fixedBuyBarQuantity" name="quantity" value="1" min="1">');


                    if(getShopifyDomain() == "shopluvit.myshopify.com"){
                        //add in the visible field in to the bar
                        $("#fixedBuyBar").append('<div class="fixedBuyBarQuantity"><input type="number" id="fixedBuyBarQuantity" name="quantity" value="1" min="1"></div>');
                    }else{
                        //add in the visible field in to the bar
                        $("div.fixedBuyBarVariants").prepend('<input type="number" id="fixedBuyBarQuantity" name="quantity" value="1" min="1">');

                    }

                    //ensure height matches
                    $("#fixedBuyBar input[name=quantity]").css("height", $(".fixedBuyBarButton input, .fixedBuyBarButton button, fixedBuyBarButton a").outerHeight());
                }

                //Add in the event listeners
                //If qty in our bar changes
                $("#fixedBuyBar input[name=quantity]").change(function(){
                    $(fixedVars.formSelector + " input[name=quantity]").val($(this).val());
                    updateCheckoutURLButton(fixedVars);
                });

                //If qty on page changes
                $(fixedVars.formSelector + " input[name=quantity]").change(function(){
                    $("#fixedBuyBar input[name=quantity]").val($(this).val());
                    updateCheckoutURLButton(fixedVars);
                });

                //If qty on page changes
                $(fixedVars.formSelector + " button.adjust").click(function(){
                    $("#fixedBuyBar input[name=quantity]").val($(fixedVars.formSelector + " input[name=quantity]").val());
                    updateCheckoutURLButton(fixedVars);
                });
            }


            //Add pulsing CSS class to buy button
            if(fixedVars.animationType == "pulse"){
                $(".fixedBuyBarButton input, .fixedBuyBarButton button").addClass("pulse-button");
            }else if(fixedVars.animationType == "shake"){
                setInterval(function(){
                    if($(".fixedBuyBarButton input, .fixedBuyBarButton button").hasClass("shake-button")){
                        $(".fixedBuyBarButton input, .fixedBuyBarButton button").removeClass("shake-button");
                    }else{
                        $(".fixedBuyBarButton input, .fixedBuyBarButton button").addClass("shake-button");
                    }
                }, 3000);
            }

            //Check and apply custom styles
            if(fixedVars.desktopSettings.paddingLeft != "" && !onMobile() && !(fixedVars.desktopSettings.barPosition == "right") && !(fixedVars.desktopSettings.barPosition == "left")){
                $("#fixedBuyBar").css("padding-left", fixedVars.desktopSettings.paddingLeft)
            }

            if(fixedVars.desktopSettings.paddingRight != "" && !onMobile()  && !(fixedVars.desktopSettings.barPosition == "right") && !(fixedVars.desktopSettings.barPosition == "left")){
                $("div.fixedBuyBarButton").css("margin-right", fixedVars.desktopSettings.paddingRight)
            }

            if(onMobile()){
                $("#fixedBuyBar").css("opacity", fixedVars.mobileSettings.mobileOpacity);
            }else{
                $("#fixedBuyBar").css("opacity", fixedVars.desktopSettings.desktopOpacity);
            }

            if(fixedVars.styleButtonBackgroundColor != "" && fixedVars.useCustomStyles){
                $("#fixedBuyBar .fixedBuyBarButton input, #fixedBuyBar .fixedBuyBarButton button").css("background-color", fixedVars.styleButtonBackgroundColor);
            }

            if(fixedVars.styleButtonTextColor != "" && fixedVars.useCustomStyles){
                $("#fixedBuyBar .fixedBuyBarButton input, #fixedBuyBar .fixedBuyBarButton button").css("color", fixedVars.styleButtonTextColor);
            }

            if(fixedVars.styleBarBackgroundColor != "" && fixedVars.useCustomStyles){
                $("#fixedBuyBar").css("background-color", fixedVars.styleBarBackgroundColor);
            }

            if(fixedVars.styleBarTextColor != "" && fixedVars.useCustomStyles){
                $('#fixedBuyBar .fixedBuyBarProductTitle a, #fixedBuyBar .fixedBuyBarReviews i, div.fixedBuyBarOriginalPrice, div.fixedBuyBarPrice').css("color", fixedVars.styleBarTextColor);
            }

            //Append payment logos graphic
            if(fixedVars.desktopSettings.paymentOptions && !fixedVars.onMobile){
                $(".fixedBuyBarButton").append('<img src="https://cdn.shopify.com/s/files/1/1482/2104/t/2/assets/payment-logos.png?12256004131392044624" class="payment-logo" />');
            }

            //trigger GA and the add to cart form submit on button click
            $(".fixedBuyBarButton button, .fixedBuyBarButton input").click(function(){

                var eventText;

                //Record an FB pixel event
                if(fixedVars.directToCheckout==true){
                    eventText = "Sticky Buy Button: Customer sent straight to checkout";
                    if (typeof fbq != "undefined"){
                        fbq("track", "InitiateCheckout")
                    }
                }else{
                    eventText = "Sticky Buy Button: Product added to cart";
                    if (typeof fbq != "undefined"){
                        fbq("track", "AddToCart")
                    }
                }

                //record an event in analytics
                window.ga && ga.loaded && ga("send", "event", "Sticky Buy Button", eventText, fixedVars.productTitle, Math.round(fixedVars.productPrice));

                //trigger button event
                if(getShopifyDomain() == "somethingyouwant1.myshopify.com" || getShopifyDomain() == "ddcrocheting.myshopify.com"){
                    $(".product-single__cart-submit-wrapper button#AddToCart").trigger("click");
                }else if(getShopifyDomain() == "nutracelle.myshopify.com" || getShopifyDomain() == "frank-wilder.myshopify.com"){
                    $(fixedVars.buyButtonSelector).trigger("click");
                }else{
                    $(fixedVars.formSelector).submit();
                }

            });

            //If direct to checkout option is enabled
            if(fixedVars.directToCheckout==true){
                updateCheckoutURLButton(fixedVars);
            }

            if((!onMobile() && displayVariants && variantCode.length > 0) || (onMobile() && variantCode.length > 0 && fixedVars.mobileSettings.mobileDesign == "full")){

                //Append each of the variant fields
                for (var i = 0, len = variantCode.length; i < len; i++) {
                    $(".fixedBuyBarVariants").append(variantCode[i]);
                }

                if(fixedVars.mobileSettings.mobileDesign == "full"){
                    if(!fixedVars.mobileSettings.showQuantity || getShopifyDomain() == "shopluvit.myshopify.com"){
                        var quantitySelectorWidth = 10;
                    }else{
                        var quantitySelectorWidth = 65;
                    }
                    var variantSelectorWidth = ($( window ).width() / variantCode.length) - (quantitySelectorWidth / variantCode.length) - 10;
                    $("#fixedBuyBar.full select").outerWidth(variantSelectorWidth);
                }

            }
            attachVariantEventListeners(fixedVars);

            if(onMobile() && variantCode.length == 0 && fixedVars.mobileSettings.mobileDesign == "full"){
                $("#fixedBuyBar.full").outerHeight(64);
            }
        }

        //Returns the offset to use when the bar is in top position
        function getTopOffset(fixedVars){

            //Get all elements that are fixed at top
            var fixedElements = $("*").filter(function(){
                if($(this).css("position") === "fixed" && $(this).css("top") === "0px" && $(this).is(":visible") && $(this).width() / $("body").width() === 1 && $(this).attr("id") != "fixedBuyBar" && $(this).css("visibility") == "visible" && $(this).css("opacity") > 0){
                    return this;
                }
            });

            var largestOffset = 0;

            if(fixedElements.length > 0){
                for (var i = 0, len = fixedElements.length; i < len; i++) {
                    if($(fixedElements[i]).outerHeight() > largestOffset){largestOffset = $(fixedElements[i]).outerHeight();}
                }
            }

            return largestOffset;
        }

        function getSideBarTop(){
            return ((window.innerHeight/2) - ($("#fixedBuyBar").outerHeight()/2));
        }

        //Sets offset/zindex and displays the bar
        function displayBar(fixedVars, currentScrollTop){
            if(widgetClosed == false){
                //If on mobile
                if(fixedVars.onMobile){

                    //Apply any custom offset settings from stored user preferences â€“ either a top offset or a bottom offset depending on bar position and whether or not weâ€™re on mobile
                    if(fixedVars.mobileSettings.barPosition=="top"){

                        $("#fixedBuyBar").css("top", (getTopOffset(fixedVars) + fixedVars.mobileSettings.positionOffset) + "px");
                    }else{
                        $("#fixedBuyBar").css("bottom", fixedVars.mobileSettings.positionOffset + "px");
                    }

                    //Apply any custom z-index settings from the server
                    $("#fixedBuyBar").css("z-index", fixedVars.mobileSettings.zindex);

                    //If on desktop
                }else{
                    if(fixedVars.desktopSettings.barPosition=="bottom"){
                        $("#fixedBuyBar").css("bottom", fixedVars.desktopSettings.positionOffset + "px");
                    }else if(fixedVars.desktopSettings.barPosition=="top"){
                        //Position the bar on desktop below any other fixed elements
                        $("#fixedBuyBar").css("top", (getTopOffset(fixedVars) + fixedVars.desktopSettings.positionOffset) + "px");
                    }else{
                        $("#fixedBuyBar").css("top", getSideBarTop());
                    }
                    //Apply any custom z-index settings from the server
                    $("#fixedBuyBar").css("z-index", fixedVars.desktopSettings.zindex);
                }

                if((fixedVars.desktopSettings.revealAt == 0 && !fixedVars.onMobile) || (fixedVars.mobileSettings.revealAt == 0 && fixedVars.onMobile)){
                    $("#fixedBuyBar").css("display", "block");
                }

                //If we're greater than the buy button position or the show after position then display the bar
                if((currentScrollTop >= fixedVars.desktopSettings.revealAt && !fixedVars.onMobile) || (currentScrollTop >= fixedVars.mobileSettings.revealAt && fixedVars.onMobile && $("#fixedBuyBar").css("display") == "none")){
                    $("#fixedBuyBar").fadeIn();
                }

                //If we're above both the buy button position and the show after position then hide the bar
                if((currentScrollTop < fixedVars.desktopSettings.revealAt && !fixedVars.onMobile) || (currentScrollTop < fixedVars.mobileSettings.revealAt && fixedVars.onMobile  && $("#fixedBuyBar").css("display") == "block")){
                    $("#fixedBuyBar").fadeOut();
                }
            }
        }

        /*
         Apply special effects to the buy now button to capture shoppers' attention
         */
        function applySpecialEffects(){

        }

        function getRandomInt(minNum, maxNum) {
            return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        }

        function getRandomizedURL(){
            return window.location.href + "?" + getRandomInt(0,10000);
        }


        /*
         Main
         */
        if(onProductPage() != -1 && onProductPage() != false){
            var theProduct, theShop, fixedVars;

            //Get the product details
            $.getJSON(getRandomizedURL(), function(shopifyProduct) {
                theProduct = shopifyProduct;
            }).done(function() {
                $.getJSON(getServerAddress() + "/bar/show", {shopify_domain: getShopifyDomain()}, function(data) {
                    theShop = data;
                }).done(function() {
                    if(theShop != null && theShop.app_enabled && ((onMobile() && theShop.mobile_enabled) || (!onMobile() && theShop.desktop_enabled))){
                        fixedVars = setupEnv(theProduct, theShop);
                        createBar(fixedVars);
                        displayBar(fixedVars,0);

                        //attach the event handlers below to the event listeners below
                        $("body").on({
                            "touchmove scrollstop": function() {
                                //displayBar(fixedVars, jQuery(this).scrollTop());
                            }
                        });

                        $( window ).resize(function() {
                            if(onMobile() || fixedVars.desktopSettings.barPosition == "top" || fixedVars.desktopSettings.barPosition == "bottom"){
                                $("#fixedBuyBar").css("width", "100%");
                            }else if(fixedVars.desktopSettings.barPosition == "left" || fixedVars.desktopSettings.barPosition == "right"){
                                $("#fixedBuyBar").css("top", getSideBarTop());
                            }
                        });

                        $(".fixedBuyBarThumbClose a").click(function(e){
                            $("#fixedBuyBar").fadeOut();
                            widgetClosed = true;
                            e.preventDefault();
                        });

                        //else if we're on desktop and there's a scroll
                        $(document).scroll(function() {
                            displayBar(fixedVars, $(this).scrollTop());
                        });

                        $(document).ready(function(){
                            if(fixedVars.onMobile){
                                $.getScript(stickyJSCDN).done(function() {
                                    if(fixedVars.mobileSettings.barPosition=="top"){
                                        $("#fixedBuyBar.mobile").sticky({topSpacing:0,getWidthFrom:"body",responsiveWidth:true});
                                    }else{
                                        $("#fixedBuyBar.mobile").sticky({bottomSpacing:0,getWidthFrom:"body",responsiveWidth:true});
                                    }
                                });
                            }else{
                                $.getScript(stickyJSCDN).done(function() {
                                    if(fixedVars.desktopSettings.barPosition=="bottom"){
                                        $("#fixedBuyBar").sticky({bottomSpacing:0,getWidthFrom:"body",responsiveWidth:true});
                                    }else if(fixedVars.desktopSettings.barPosition=="right" || fixedVars.desktopSettings.barPosition=="left" ){
                                        $("#fixedBuyBar").sticky({topSpacing:getSideBarTop()});
                                    }else{
                                        $("#fixedBuyBar").sticky({topSpacing:0,getWidthFrom:"body",responsiveWidth:true});
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    }(jQuery));