var animateCSSDSN = "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css",
    stickyJSCDN = "https://cdnjs.cloudflare.com/ajax/libs/jquery.sticky/1.0.4/jquery.sticky.min.js",
    widgetClosed = false;
!function ($) {
    function isProductPage() {
        return window.location.href.indexOf("/products/")
    }

    function shopUrl() {
        for (var t = document.getElementsByTagName("script"), e = "", i = "", o = 0; o < t.length; o++)
            if ((e = t[o].getAttribute("src")) && (e = e.match(/^(.*)new-sticky-button.js(\?\s*(.+))?\s*/))) {
                i = e[3].match(/shop=(.+).myshopify.com/)[1];
                break
            }
        return i + ".myshopify.com"
    }

    function serverUrl() {
        return "https://c72a0e96.ngrok.io";
    }

    function isOnMobile() {
        return !(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)) || !(null == screen || null != screen && screen.width < 768))
    }

    function state(productJSON, barOptions) {
        $("head").append('<link rel="stylesheet" href="https://mkucz.com/assets/css/better-sticky-button.css" type="text/css" />'), 0 == $("link[href*='animate.min.css']").length && 0 == $("link[href*='animate.css']").length && $("head").append('<link rel="stylesheet" href="' + animateCSSDSN + '?v0.1" type="text/css" />');
        var n = productJSON.product.id,
            r = productJSON.product;
        return S = {
            shopURL: window.location.hostname,
            onMobile: isOnMobile(),
            pulseButton: barOptions.pulse_button,
            animationType: barOptions.animation_type,
            customCSS: barOptions.custom_css,
            buyButtonText: barOptions.buy_button_text,
            directToCheckout: barOptions.direct_to_checkout,
            designTemplate: isOnMobile() ? "mobile" : "responsive",
            htmlPrices: barOptions.html_prices,
            productId: n,
            productTitle: r.title.replace(/<(?:.|\n)*?>/gm, ""),
            productVariantName: r.variants.length > 1 ? r.variants[0].title.replace(/<(?:.|\n)*?>/gm, "") : "",
            productVariants: r.variants,
            productPrice: r.variants[0].price,
            productCompareAtPrice: r.variants[0].compare_at_price,
            productImage: r.images.length > 0 ? r.images[0].src : "",
            priceSelector: barOptions.price_selector,
            originalPriceSelector: barOptions.original_price_selector,
            buyButtonSelector: $(barOptions.buy_button_selector).length ? barOptions.buy_button_selector : "form[action^='/cart/add']:first button:visible:last",
            reviewStarsSelector: barOptions.review_stars_selector,
            formSelector: barOptions.form_selector,
            variantSelector: barOptions.variant_selector,
            soldOutText: barOptions.sold_out_text,
            styleBarTextColor: barOptions.style_bar_text_color,
            styleButtonTextColor: barOptions.style_button_text_color,
            styleBarBackgroundColor: barOptions.style_bar_background_color,
            styleButtonBackgroundColor: barOptions.style_button_background_color,
            currencySymbol: barOptions.currency_symbol,
            useCustomStyles: barOptions.use_custom_styles,
            desktopSettings: {
                desktopEnabled: barOptions.desktop_enabled,
                desktopDesign: barOptions.desktop_design_template,
                barPosition: barOptions.desktop_bar_position,
                positionOffset: barOptions.desktop_position_offset ? barOptions.desktop_position_offset : 0,
                revealAt: barOptions.desktop_reveal_at,
                showVariants: barOptions.desktop_variants,
                paymentOptions: barOptions.desktop_payment_options,
                socialShare: barOptions.desktop_social_share,
                directToCheckout: barOptions.desktop_direct_to_cart,
                buyNowButtonText: barOptions.buy_button_text,
                zindex: barOptions.desktop_z_index,
                paddingLeft: barOptions.desktop_padding_left,
                paddingRight: barOptions.desktop_padding_right,
                desktopOpacity: barOptions.desktop_opacity,
                showQuantity: barOptions.desktop_show_quantity,
                showCompareAt: barOptions.desktop_show_compare_at
            },
            mobileSettings: {
                mobileEnabled: barOptions.mobile_enabled,
                mobileDirectToCheckout: barOptions.mobile_direct_to_checkout,
                mobileDesign: barOptions.mobile_design_template,
                mobileOpacity: barOptions.mobile_opacity,
                barPosition: barOptions.mobile_bar_position,
                positionOffset: barOptions.mobile_position_offset ? barOptions.mobile_position_offset : 0,
                revealAt: barOptions.mobile_reveal_at,
                showCompareAt: barOptions.mobile_show_compare_at,
                zindex: barOptions.mobile_z_index,
                showQuantity: barOptions.show_quantity_on_mobile,
                showVariants: barOptions.show_variants_on_mobile
            }
        }, "addtocart" == S.mobileSettings.revealAt && (S.mobileSettings.revealAt = $(S.buyButtonSelector).position().top), "addtocart" == S.desktopSettings.revealAt && (S.desktopSettings.revealAt = $(S.buyButtonSelector).position().top), "" != S.customCSS && $("head").append("<style>" + S.customCSS + "</style>"), S
    }

    function getProductVariant(state) {
        var e = location.search.match(/variant=([0-9]+)/);
        return null != e ? e[1] : state.productVariants[0].id
    }

    function getProductVariantTitle(state) {
        var title = "";
        $(state.productVariants).each(function () {
            if (this.id == getProductVariant(state)) {
                title = this.title;
            }
        });
        return title;
    }

    function getVariantSelectorCode(state) {
        var variantSelectorCode = $(state.variantSelector).clone(),
            option = "",
            options = [];
        variantSelectorCode.find("[type=radio]").length > 0 ? ($(state.variantSelector).each(function (e, i) {
            var r = "";
            $(i).attr("data-option") && (r = " data-option='" + $(i).attr("data-option") + "' "), $(i).attr("data-index") && (r += " data-index='" + $(i).attr("data-index") + "' "), $(i).attr("name") && (r += " name='" + $(i).attr("name") + "' "), option = $("<select " + r + "></select>"), $(i).find("input[type=radio]").each(function (e, i) {
                r = "";
                a = "";
                if ($(i).attr("value") == getProductVariantTitle(state) || $(i).prop("checked")) {
                    var a = "SELECTED";
                }
                if ($(i).attr("data-option")) {
                    (r = " data-option='" + $(i).attr("data-option") + "' "), $(i).attr("data-index") && (r += " data-index='" + $(i).attr("data-index") + "' "), option.append("<option " + r + " value='" + $(i).attr("value") + "' " + a + ">" + $(i).attr("value") + "</option>")
                }
            }), options.push(option)
        }), variantSelectorCode = options.reverse()) : $(state.variantSelector).each(function (e) {
            variantSelectorCode.eq(e).val($(this).val())
        })
        return variantSelectorCode;
    }

    function d(state) {
        $(state.variantSelector).find("[type=radio]").length > 0 ? ($(".fixedBuyBarVariants select").change(function () {
            var i = $(state.variantSelector).find("input[data-option=" + $(this).data("option") + "], input[data-index=" + $(this).data("index") + "], input[name='" + ($(this).attr("name") ? $(this).attr("name").replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1") : "") + "']"),
                o = $(this).val();
            $(i).each(function (e, i) {
                o == $(i).val() && ($(i).prop("checked", true), $(i).change())
            }), applyCustomBarOptions(state), l(state)
        }), $("body").on("change", ".radio-wrapper fieldset input,  .product__available-sizes:first input, .product__available-colors:first input", function () {
            var i = $(".fixedBuyBarVariants select[data-option=" + $(this).data("option") + "], .fixedBuyBarVariants select[data-index=" + $(this).data("index") + "], .fixedBuyBarVariants select[name='" + ($(this).attr("name") ? $(this).attr("name").replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1") : "") + "']");
            $(i).val($(this).val()), applyCustomBarOptions(state), l(state)
        })) : ($(".fixedBuyBarVariants select").change(function () {
            $("#" + $(this).attr("id")).val($(this).val()), $("#" + $(this).attr("id")).change(), applyCustomBarOptions(state), l(state)
        }), $("body").on("change", state.variantSelector + ", " + state.variantSelector + " input, " + state.variantSelector + " select", function () {
            "radio" == $("#" + $(this).attr("id")).attr("type") && $("#" + $(this).attr("id")).prop("checked") && $(".fixedBuyBarVariants #" + $(this).attr("id")).prop("checked", !0), $(".fixedBuyBarVariants #" + $(this).attr("id")).val($(this).val()), applyCustomBarOptions(state), l(state)
        }))
    }

    function formatNumbers(t, e) {
        return -1 !== t.indexOf("{{amount_no_decimals}}") ? t.replace("{{amount_no_decimals}}", Math.round(e)) : -1 !== t.indexOf("{{amount_with_comma_separator}}") ? t.replace("{{amount_with_comma_separator}}", e.replace(".", ",")) : -1 !== t.indexOf("{{amount_no_decimals_with_comma_separator}}") ? t.replace("{{amount_no_decimals_with_comma_separator}}", Math.round(e).replace(".", ",")) : -1 !== t.indexOf("{{amount_with_apostrophe_separator}}") ? t.replace("{{amount_with_apostrophe_separator}}", e.replace(".", "'")) : -1 !== t.indexOf("{{amount_no_decimals_with_space_separator}}") ? t.replace("{{amount_no_decimals_with_space_separator}}", Math.round(e).replace(",", " ")) : -1 !== t.indexOf("{{amount_with_space_separator}}") ? t.replace("{{amount_with_space_separator}}", e.replace(".", " ")) : t.replace("{{amount}}", e)
    }

    function l(e) {
        for (var o, a, n = e.productTitle, s = 0, u = e.productVariants.length; u > s; s++) e.productVariants[s].id == getProductVariant(e) && (o = formatNumbers(e.currencySymbol, e.productVariants[s].price), "Default Title" != e.productVariants[s].title && (n = e.productTitle + " - " + e.productVariants[s].title), n = e.productTitle + " - " + e.productVariants[s].title, null == e.productVariants[s].compare_at_price || "" == e.productVariants[s].compare_at_price || e.productVariants[s].price > e.productVariants[s].compare_at_price ? a = "" : (a = formatNumbers(e.currencySymbol, e.productVariants[s].compare_at_price), "shopluvit.myshopify.com" == shopUrl() && (a = "")));
        "hobbieshut.myshopify.com" == shopUrl() ? ($(".fixedBuyBarPrice").html($(e.priceSelector).html()), $(e.originalPriceSelector) ? $(".fixedBuyBarOriginalPrice").html($(e.originalPriceSelector).html()) : $(".fixedBuyBarOriginalPrice").html("")) : ($(".fixedBuyBarPrice").html(o), $(".fixedBuyBarOriginalPrice").html(a)), $(".fixedBuyBarProductTitle a:first").text(n)
    }

    function cartUrlWithQuantity(state) {
        var quantity = 1;
        if ($(state.formSelector + " input[name=quantity]").length > 0) {
            quantity = $(state.formSelector + " input[name=quantity]").val();
        }
        return "https://" + state.shopURL + "/cart/" + getProductVariant(state) + ":" + quantity
    }

    function delayFor(time) {
        return new Promise(function (e) {
            setTimeout(e, time)
        })
    }

    function applyCustomBarOptions(state) {
        if (state.directToCheckout) {
            $(".fixedBuyBarButton input, .fixedBuyBarButton button").click(function () {
                window.location.replace(cartUrlWithQuantity(state))
            })
        }
        delayFor(250).then(function () {
            $(".fixedBuyBarButton input, .fixedBuyBarButton button").prop("disabled", $(state.buyButtonSelector).prop("disabled")), $(state.buyButtonSelector).prop("disabled") ? ($(".fixedBuyBarButton input, .fixedBuyBarButton button").text(state.soldOutText), $(".fixedBuyBarButton input, .fixedBuyBarButton button").val(state.soldOutText)) : ($(".fixedBuyBarButton input, .fixedBuyBarButton button").text(state.buyButtonText), $(".fixedBuyBarButton input, .fixedBuyBarButton button").val(state.buyButtonText)), $(state.buyButtonSelector).prop("disabled") ? $(".fixedBuyBarButton input, .fixedBuyBarButton button").css("cursor", "default") : $(".fixedBuyBarButton input, .fixedBuyBarButton button").css("cursor", "pointer"), state.useCustomStyles || ($(".fixedBuyBarButton input, .fixedBuyBarButton button").css("background-color", $(state.buyButtonSelector).css("background-color")), $(".fixedBuyBarButton input, .fixedBuyBarButton button").css("color", $(state.buyButtonSelector).css("color")), $(".fixedBuyBarButton input, .fixedBuyBarButton button").css("border", $(state.buyButtonSelector).css("border")))
        })
    }

    function f(state) {
        var buyButtonText = state.buyButtonText;
        $(state.buyButtonSelector).prop("disabled") && (buyButtonText = state.soldOutText);
        var n = $(state.buyButtonSelector).clone().text(buyButtonText),
            s = 0 != $(state.reviewStarsSelector).length ? $(state.reviewStarsSelector).html() : "",
            l = "",
            p = "",
            productTitle = state.productTitle;
        n.is("input") && n.val(buyButtonText);
        for (var f = 0, b = state.productVariants.length; b > f; f++) state.productVariants[f].id == getProductVariant(state) && (null != state.productVariants[f].price && (l = formatNumbers(state.currencySymbol, state.productVariants[f].price)), null != state.productVariants[f].compare_at_price && parseInt(state.productVariants[f].price) < parseInt(state.productVariants[f].compare_at_price) && (p = formatNumbers(state.currencySymbol, state.productVariants[f].compare_at_price), "shopluvit.myshopify.com" == shopUrl() && (p = "")), "Default Title" != state.productVariants[f].title && "Default" != state.productVariants[f].title && (productTitle = state.productTitle + " - " + state.productVariants[f].title, productTitle = productTitle.replace(/<(?:.|\n)*?>/gm, "")));
        var h = !1,
            g = [];
        if (state.productVariants.length > 1 && (state.onMobile && "full" == state.mobileSettings.mobileDesign || !state.onMobile && state.desktopSettings.showVariants || !state.onMobile && "right" == state.desktopSettings.barPosition) && (g = getVariantSelectorCode(state), h = !0), isOnMobile()) switch (state.mobileSettings.mobileDesign) {
            case "mobile":
                $("body").append("<div id='fixedBuyBar' class='mobile'><div class='fixedBuyBarButton'></div></div>");
                break;
            case "full":
                $("body").append("<div id='fixedBuyBar' class='full'><div class='fixedBuyBarVariants'></div><div class='fixedBuyBarButton'></div><div class='fixedBuyBarConfirm'>Product Added!</div><div class='fixedBuyBarPrice'>" + l + "</div><div class='fixedBuyBarOriginalPrice'>" + p + "</div></div>")
        } else "right" == state.desktopSettings.barPosition || "left" == state.desktopSettings.barPosition ? $("body").append("<div id='fixedBuyBar' class='" + state.desktopSettings.barPosition + "'><div class='fixedBuyBarThumbClose'><a href='#'>[x]</a></div><div class='fixedBuyBarThumb'><img src='" + state.productImage + "'></div><div class='fixedBuyBarProductTitle'><a href='#'>" + productTitle + "</a><div class='fixedBuyBarReviews'>" + s + "</div></div><div class='fixedBuyBarVariants'><div class='fixedBuyBarPrice'>" + l + "</div></div><div class='fixedBuyBarButton'></div><div class='fixedBuyBarConfirm'>Product Added!</div></div>") : $("body").append("<div id='fixedBuyBar' class='desktop'><div class='fixedBuyBarThumb'><img src='" + state.productImage + "'></div><div class='fixedBuyBarProductTitle'>" + productTitle + "<div class='fixedBuyBarReviews'>" + s + "</div></div><div class='fixedBuyBarButton'></div><div class='fixedBuyBarConfirm'>Product Added!</div><div class='fixedBuyBarPrice'>" + l + "</div><div class='fixedBuyBarOriginalPrice'>" + p + "</div><div class='fixedBuyBarVariants'></div></div>");
        if ($(".fixedBuyBarButton").html(n), state.desktopSettings.showCompareAt || isOnMobile() && "full" == state.mobileSettings.mobileDesign || $("#fixedBuyBar.desktop div.fixedBuyBarOriginalPrice").remove(), (state.desktopSettings.showQuantity && !isOnMobile() || isOnMobile() && "full" == state.mobileSettings.mobileDesign && state.mobileSettings.showQuantity || !isOnMobile() && "right" == state.desktopSettings.barPosition) && (0 != $(state.formSelector + " input[name=quantity]").length ? "shopluvit.myshopify.com" == shopUrl() ? $("#fixedBuyBar").append("<div class='fixedBuyBarQuantity'>" + $(state.formSelector + " input[name=quantity]").clone().prop("outerHTML") + "</div>") : $("div.fixedBuyBarVariants").prepend($(state.formSelector + " input[name=quantity]:first").clone()) : ($(state.formSelector).append('<input type="hidden" id="fixedBuyBarQuantity" name="quantity" value="1" min="1">'), "shopluvit.myshopify.com" == shopUrl() ? $("#fixedBuyBar").append('<div class="fixedBuyBarQuantity"><input type="number" id="fixedBuyBarQuantity" name="quantity" value="1" min="1"></div>') : $("div.fixedBuyBarVariants").prepend('<input type="number" id="fixedBuyBarQuantity" name="quantity" value="1" min="1">')), $("#fixedBuyBar input[name=quantity]").change(function () {
                $(state.formSelector + " input[name=quantity]").val($(this).val()), applyCustomBarOptions(state)
            }), $(state.formSelector + " input[name=quantity]").change(function () {
                $("#fixedBuyBar input[name=quantity]").val($(this).val()), applyCustomBarOptions(state)
            }), $(state.formSelector + " button.adjust").click(function () {
                $("#fixedBuyBar input[name=quantity]").val($(state.formSelector + " input[name=quantity]").val()), applyCustomBarOptions(state)
            })), "pulse" == state.animationType ? $(".fixedBuyBarButton input, .fixedBuyBarButton button").addClass("pulse-button") : "shake" == state.animationType && setInterval(function () {
                    $(".fixedBuyBarButton input, .fixedBuyBarButton button").hasClass("shake-button") ? $(".fixedBuyBarButton input, .fixedBuyBarButton button").removeClass("shake-button") : $(".fixedBuyBarButton input, .fixedBuyBarButton button").addClass("shake-button")
                }, 3e3), "" == state.desktopSettings.paddingLeft || isOnMobile() || "right" == state.desktopSettings.barPosition || "left" == state.desktopSettings.barPosition || $("#fixedBuyBar").css("padding-left", state.desktopSettings.paddingLeft), "" == state.desktopSettings.paddingRight || isOnMobile() || "right" == state.desktopSettings.barPosition || "left" == state.desktopSettings.barPosition || $("div.fixedBuyBarButton").css("margin-right", state.desktopSettings.paddingRight), isOnMobile() ? $("#fixedBuyBar").css("opacity", state.mobileSettings.mobileOpacity) : $("#fixedBuyBar").css("opacity", state.desktopSettings.desktopOpacity), "" != state.styleButtonBackgroundColor && state.useCustomStyles && $("#fixedBuyBar .fixedBuyBarButton input, #fixedBuyBar .fixedBuyBarButton button").css("background-color", state.styleButtonBackgroundColor), "" != state.styleButtonTextColor && state.useCustomStyles && $("#fixedBuyBar .fixedBuyBarButton input, #fixedBuyBar .fixedBuyBarButton button").css("color", state.styleButtonTextColor), "" != state.styleBarBackgroundColor && state.useCustomStyles && $("#fixedBuyBar").css("background-color", state.styleBarBackgroundColor), "" != state.styleBarTextColor && state.useCustomStyles && $("#fixedBuyBar .fixedBuyBarProductTitle a, #fixedBuyBar .fixedBuyBarReviews i, div.fixedBuyBarOriginalPrice, div.fixedBuyBarPrice").css("color", state.styleBarTextColor), state.desktopSettings.paymentOptions && !state.onMobile && $(".fixedBuyBarButton").append('<img src="https://cdn.shopify.com/s/files/1/1482/2104/t/2/assets/payment-logos.png?12256004131392044624" class="payment-logo" />'), $(".fixedBuyBarButton button, .fixedBuyBarButton input, " + state.buyButtonSelector).click(function () {
                "unexpected-deals.myshopify.com" == shopUrl() && $("#fixedBuyBar").hide()
            }), $(".fixedBuyBarButton button, .fixedBuyBarButton input").click(function () {
                var o;
                state.directToCheckout ? (o = "Sticky Buy Button: Customer sent straight to checkout", "undefined" != typeof fbq && fbq("track", "InitiateCheckout")) : (o = "Sticky Buy Button: Product added to cart", "undefined" != typeof fbq && fbq("track", "AddToCart")), window.ga && ga.loaded && ga("send", "event", "Sticky Buy Button", o, state.productTitle, Math.round(state.productPrice)), "somethingyouwant1.myshopify.com" == shopUrl() || "ddcrocheting.myshopify.com" == shopUrl() ? $(".product-single__cart-submit-wrapper button#AddToCart").trigger("click") : "nutracelle.myshopify.com" == shopUrl() || "frank-wilder.myshopify.com" == shopUrl() ? $(state.buyButtonSelector).trigger("click") : $(state.formSelector).submit()
            }), state.directToCheckout && applyCustomBarOptions(state), !isOnMobile() && h && g.length > 0 || isOnMobile() && g.length > 0 && "full" == state.mobileSettings.mobileDesign) {
            for (var f = 0, b = g.length; b > f; f++) {
                $(".fixedBuyBarVariants").append(g[f]);
            }
            if ("full" == state.mobileSettings.mobileDesign) {
                var x;
                if (state.mobileSettings.showQuantity) {
                    x = 75;
                }
                else {
                    x = 10;
                }
                var v = $(window).width() / g.length - x / g.length - 10;
                $("#fixedBuyBar.full select").outerWidth(v)
            }
        }
        m(g), d(state), isOnMobile() && 0 == g.length && "full" == state.mobileSettings.mobileDesign && ($("#fixedBuyBar.full").outerHeight($(".fixedBuyBarButton input, .fixedBuyBarButton button").outerHeight() + 10), $("#fixedBuyBar input[name=quantity]").length && ($("#fixedBuyBar input[name=quantity]").css("margin-top", 5), $("#fixedBuyBar input[name=quantity]").css("float", "left"))), isOnMobile() && "full" == state.mobileSettings.mobileDesign && $(".full .fixedBuyBarOriginalPrice, .full .fixedBuyBarPrice").css("line-height", $(".fixedBuyBarButton input, .fixedBuyBarButton button").outerHeight() + 5 + "px")
    }

    function m(e) {
        if (e.length)
            if (isOnMobile()) var i = 48;
            else var i = $(".fixedBuyBarVariants select").outerHeight();
        else var i = $(".fixedBuyBarButton input, .fixedBuyBarButton button, fixedBuyBarButton a").outerHeight();
        $("#fixedBuyBar input[name=quantity]").outerHeight(i)
    }

    function b() {
        var e = $("*").filter(function () {
                return "fixed" === $(this).css("position") && "0px" === $(this).css("top") && $(this).is(":visible") && $(this).width() / $("body").width() === 1 && "fixedBuyBar" != $(this).attr("id") && "visible" == $(this).css("visibility") && $(this).css("opacity") > 0 ? this : void 0
            }),
            i = 0;
        if (e.length > 0)
            for (var o = 0, a = e.length; a > o; o++) $(e[o]).outerHeight() > i && (i = $(e[o]).outerHeight());
        return i
    }

    function calculateSpacing() {
        return window.innerHeight / 2 - $("#fixedBuyBar").outerHeight() / 2
    }

    function g(state, scrollTop) {
        if (!widgetClosed) {
            (state.onMobile ? ("top" == state.mobileSettings.barPosition ? $("#fixedBuyBar").css("top", b(state) + state.mobileSettings.positionOffset + "px") : $("#fixedBuyBar").css("bottom", state.mobileSettings.positionOffset + "px"), $("#fixedBuyBar").css("z-index", state.mobileSettings.zindex)) : ("bottom" == state.desktopSettings.barPosition ? $("#fixedBuyBar").css("bottom", state.desktopSettings.positionOffset + "px") : "top" == state.desktopSettings.barPosition ? $("#fixedBuyBar").css("top", b(state) + state.desktopSettings.positionOffset + "px") : $("#fixedBuyBar").css("top", calculateSpacing()), $("#fixedBuyBar").css("z-index", state.desktopSettings.zindex)), (0 == state.desktopSettings.revealAt && !state.onMobile || 0 == state.mobileSettings.revealAt && state.onMobile) && $("#fixedBuyBar").css("display", "block"), (scrollTop >= state.desktopSettings.revealAt && !state.onMobile || scrollTop >= state.mobileSettings.revealAt && state.onMobile && "none" == $("#fixedBuyBar").css("display")) && $("#fixedBuyBar").fadeIn(), (scrollTop < state.desktopSettings.revealAt && !state.onMobile || scrollTop < state.mobileSettings.revealAt && state.onMobile && "block" == $("#fixedBuyBar").css("display")) && $("#fixedBuyBar").fadeOut())
        }
    }

    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function locationWithRandomParam() {
        return window.location.href + "?" + randomNum(0, 1e4)
    }

    if (-1 != isProductPage() && 0 != isProductPage()) {
        var productJSON, barOptions, S;
        $.getJSON(locationWithRandomParam(), function (t) {
            productJSON = t
        }).done(function () {
            $.getJSON(serverUrl() + "/bar/show", {
                shopify_domain: shopUrl()
            }, function (t) {
                barOptions = t
            }).done(function () {
                null != barOptions && barOptions.app_enabled && (isOnMobile() && barOptions.mobile_enabled || !isOnMobile() && barOptions.desktop_enabled) && (S = state(productJSON, barOptions), f(S), g(S, 0), $("body").on({
                    "touchmove scrollstop": function () {
                    }
                }), $(window).resize(function () {
                    isOnMobile() || "top" == S.desktopSettings.barPosition || "bottom" == S.desktopSettings.barPosition ? $("#fixedBuyBar").css("width", "100%") : "left" != S.desktopSettings.barPosition && "right" != S.desktopSettings.barPosition || $("#fixedBuyBar").css("top", calculateSpacing())
                }), $(".fixedBuyBarThumbClose a").click(function (e) {
                    e.preventDefault();
                    $("#fixedBuyBar").fadeOut();
                    widgetClosed = true;
                }), $(document).scroll(function () {
                    g(S, $(this).scrollTop())
                }), $(document).ready(function () {
                    S.onMobile ? $.getScript(stickyJSCDN).done(function () {
                        "top" == S.mobileSettings.barPosition ? $("#fixedBuyBar.mobile").sticky({
                            topSpacing: 0,
                            getWidthFrom: "body",
                            responsiveWidth: !0
                        }) : $("#fixedBuyBar.mobile").sticky({
                            bottomSpacing: 0,
                            getWidthFrom: "body",
                            responsiveWidth: !0
                        })
                    }) : $.getScript(stickyJSCDN).done(function () {
                        "bottom" == S.desktopSettings.barPosition ? $("#fixedBuyBar").sticky({
                            bottomSpacing: 0,
                            getWidthFrom: "body",
                            responsiveWidth: !0
                        }) : "right" == S.desktopSettings.barPosition || "left" == S.desktopSettings.barPosition ? $("#fixedBuyBar").sticky({
                            topSpacing: calculateSpacing()
                        }) : $("#fixedBuyBar").sticky({
                            topSpacing: 0,
                            getWidthFrom: "body",
                            responsiveWidth: !0
                        })
                    })
                }))
            })
        })
    }
}(jQuery);