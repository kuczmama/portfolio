var animateCSSDSN = "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css",
    stickyJSCDN = "https://cdnjs.cloudflare.com/ajax/libs/jquery.sticky/1.0.4/jquery.sticky.min.js", widgetClosed = !1,
    barOn = !1;
!function (t) {
    function goToProducts() {
        return window.location.href.indexOf("/products/")
    }

    function i() {
        for (var t = document.getElementsByTagName("script"), e = "", i = "", o = 0; o < t.length; o++)
            if ((e = t[o].getAttribute("src")) && (e = e.match(/^(.*)sticky-buy-now-button.js(\?\s*(.+))?\s*/))) {
                i = e[3].match(/shop=(.+).myshopify.com/)[1];
                break
            }
        return i + ".myshopify.com"
    }

    function o() {
        return "crazyappsfactory.myshopify.com" == i() ? "https://sticky-buy-now-button-dev.herokuapp.com" : "crazy-apps-house.myshopify.com" == i() ? "https://sticky-buy-now-button-cnorton.c9users.io" : "https://sticky-buy-now-button.herokuapp.com"
    }

    function isOnMobile() {
        return !(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)) || !(null == screen || null != screen && screen.width < 768))
    }

    function n(e, i) {
        t("head").append('<link rel="stylesheet" href="' + o() + "/sticky-buy-now-button.css?" + 10 * Math.random() + '" type="text/css" />'), 0 == t("link[href*='animate.min.css']").length && 0 == t("link[href*='animate.css']").length && t("head").append('<link rel="stylesheet" href="' + animateCSSDSN + '?v0.1" type="text/css" />');
        var n = e.product.id, r = e.product;
        return S = {
            shopURL: window.location.hostname,
            onMobile: isOnMobile(),
            pulseButton: i.pulse_button,
            animationType: i.animation_type,
            customCSS: i.custom_css,
            buyButtonText: i.buy_button_text,
            directToCheckout: i.direct_to_checkout,
            designTemplate: isOnMobile() ? "mobile" : "responsive",
            htmlPrices: i.html_prices,
            productId: n,
            productTitle: r.title.replace(/<(?:.|\n)*?>/gm, ""),
            productVariantName: r.variants.length > 1 ? r.variants[0].title.replace(/<(?:.|\n)*?>/gm, "") : "",
            productVariants: r.variants,
            productPrice: r.variants[0].price,
            productCompareAtPrice: r.variants[0].compare_at_price,
            productImage: r.images.length > 0 ? r.images[0].src : "",
            priceSelector: i.price_selector,
            originalPriceSelector: i.original_price_selector,
            buyButtonSelector: t(i.buy_button_selector).length ? i.buy_button_selector : "form[action^='/cart/add']:first button:visible:last",
            reviewStarsSelector: i.review_stars_selector,
            formSelector: i.form_selector,
            variantSelector: i.variant_selector,
            soldOutText: i.sold_out_text,
            styleBarTextColor: i.style_bar_text_color,
            styleButtonTextColor: i.style_button_text_color,
            styleBarBackgroundColor: i.style_bar_background_color,
            styleButtonBackgroundColor: i.style_button_background_color,
            currencySymbol: i.currency_symbol,
            useCustomStyles: i.use_custom_styles,
            desktopSettings: {
                desktopEnabled: i.desktop_enabled,
                desktopDesign: i.desktop_design_template,
                barPosition: i.desktop_bar_position,
                positionOffset: i.desktop_position_offset ? i.desktop_position_offset : 0,
                revealAt: i.desktop_reveal_at,
                showVariants: i.desktop_variants,
                paymentOptions: i.desktop_payment_options,
                socialShare: i.desktop_social_share,
                directToCheckout: i.desktop_direct_to_cart,
                buyNowButtonText: i.buy_button_text,
                zindex: i.desktop_z_index,
                paddingLeft: i.desktop_padding_left,
                paddingRight: i.desktop_padding_right,
                desktopOpacity: i.desktop_opacity,
                showQuantity: i.desktop_show_quantity,
                showCompareAt: i.desktop_show_compare_at
            },
            mobileSettings: {
                mobileEnabled: i.mobile_enabled,
                mobileDirectToCheckout: i.mobile_direct_to_checkout,
                mobileDesign: i.mobile_design_template,
                mobileOpacity: i.mobile_opacity,
                barPosition: i.mobile_bar_position,
                positionOffset: i.mobile_position_offset ? i.mobile_position_offset : 0,
                revealAt: i.mobile_reveal_at,
                showCompareAt: i.mobile_show_compare_at,
                zindex: i.mobile_z_index,
                showQuantity: i.show_quantity_on_mobile,
                showVariants: i.show_variants_on_mobile
            }
        }, "addtocart" == S.mobileSettings.revealAt && (S.mobileSettings.revealAt = t(S.buyButtonSelector).position().top), "addtocart" == S.desktopSettings.revealAt && (S.desktopSettings.revealAt = t(S.buyButtonSelector).position().top), "" != S.customCSS && t("head").append("<style>" + S.customCSS + "</style>"), S
    }

    function r(t) {
        var e = location.search.match(/variant=([0-9]+)/);
        return null != e ? e[1] : t.productVariants[0].id
    }

    function s(e) {
        var i = "";
        return t(e.productVariants).each(function () {
            this.id == r(e) && (i = this.title)
        }), i
    }

    function u(e) {
        var i = t(e.variantSelector).clone(), o = "", a = [], n = s(e);
        return i.find("[type=radio]").length > 0 ? (t(e.variantSelector).each(function (e, i) {
            var r = "";
            t(i).attr("data-option") && (r = " data-option='" + t(i).attr("data-option") + "' "), t(i).attr("data-index") && (r += " data-index='" + t(i).attr("data-index") + "' "), t(i).attr("name") && (r += " name='" + t(i).attr("name") + "' "), o = t("<select " + r + "></select>"), t(i).find("input[type=radio]").each(function (e, i) {
                if (r = "", a = "", t(i).attr("value") == n)var a = "SELECTED";
                if (t(i).prop("checked"))var a = "SELECTED";
                t(i).attr("data-option") && (r = " data-option='" + t(i).attr("data-option") + "' "), t(i).attr("data-index") && (r += " data-index='" + t(i).attr("data-index") + "' "), o.append("<option " + r + " value='" + t(i).attr("value") + "' " + a + ">" + t(i).attr("value") + "</option>")
            }), a.push(o)
        }), i = a.reverse()) : t(e.variantSelector).each(function (e) {
            i.eq(e).val(t(this).val())
        }), i
    }

    function d(e) {
        t(e.variantSelector).find("[type=radio]").length > 0 ? (t(".fixedBuyBarVariants select").change(function () {
            var i = t(e.variantSelector).find("input[data-option=" + t(this).data("option") + "], input[data-index=" + t(this).data("index") + "], input[name='" + (t(this).attr("name") ? t(this).attr("name").replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1") : "") + "']"),
                o = t(this).val();
            t(i).each(function (e, i) {
                o == t(i).val() && (t(i).prop("checked", !0), t(i).change())
            }), y(e), l(e)
        }), t("body").on("change", ".radio-wrapper fieldset input,  .product__available-sizes:first input, .product__available-colors:first input", function () {
            var i = t(".fixedBuyBarVariants select[data-option=" + t(this).data("option") + "], .fixedBuyBarVariants select[data-index=" + t(this).data("index") + "], .fixedBuyBarVariants select[name='" + (t(this).attr("name") ? t(this).attr("name").replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1") : "") + "']");
            t(i).val(t(this).val()), y(e), l(e)
        })) : (t(".fixedBuyBarVariants select").change(function () {
            t("#" + t(this).attr("id")).val(t(this).val()), t("#" + t(this).attr("id")).change(), y(e), l(e)
        }), t("body").on("change", e.variantSelector + ", " + e.variantSelector + " input, " + e.variantSelector + " select", function () {
            "radio" == t("#" + t(this).attr("id")).attr("type") && t("#" + t(this).attr("id")).prop("checked") && t(".fixedBuyBarVariants #" + t(this).attr("id")).prop("checked", !0), t(".fixedBuyBarVariants #" + t(this).attr("id")).val(t(this).val()), y(e), l(e)
        }))
    }

    function c(t, e) {
        return -1 !== t.indexOf("{{amount_no_decimals}}") ? t.replace("{{amount_no_decimals}}", Math.round(e)) : -1 !== t.indexOf("{{amount_with_comma_separator}}") ? t.replace("{{amount_with_comma_separator}}", e.replace(".", ",")) : -1 !== t.indexOf("{{amount_no_decimals_with_comma_separator}}") ? t.replace("{{amount_no_decimals_with_comma_separator}}", Math.round(e).replace(".", ",")) : -1 !== t.indexOf("{{amount_with_apostrophe_separator}}") ? t.replace("{{amount_with_apostrophe_separator}}", e.replace(".", "'")) : -1 !== t.indexOf("{{amount_no_decimals_with_space_separator}}") ? t.replace("{{amount_no_decimals_with_space_separator}}", Math.round(e).replace(",", " ")) : -1 !== t.indexOf("{{amount_with_space_separator}}") ? t.replace("{{amount_with_space_separator}}", e.replace(".", " ")) : t.replace("{{amount}}", e)
    }

    function l(e) {
        for (var o, a, n = e.productTitle, s = 0, u = e.productVariants.length; u > s; s++)e.productVariants[s].id == r(e) && (o = c(e.currencySymbol, e.productVariants[s].price), "Default Title" != e.productVariants[s].title && (n = e.productTitle + " - " + e.productVariants[s].title), n = e.productTitle + " - " + e.productVariants[s].title, null == e.productVariants[s].compare_at_price || "" == e.productVariants[s].compare_at_price || e.productVariants[s].price > e.productVariants[s].compare_at_price ? a = "" : (a = c(e.currencySymbol, e.productVariants[s].compare_at_price), "shopluvit.myshopify.com" == i() && (a = "")));
        "hobbieshut.myshopify.com" == i() ? (t(".fixedBuyBarPrice").html(t(e.priceSelector).html()), t(e.originalPriceSelector) ? t(".fixedBuyBarOriginalPrice").html(t(e.originalPriceSelector).html()) : t(".fixedBuyBarOriginalPrice").html("")) : (t(".fixedBuyBarPrice").html(o), t(".fixedBuyBarOriginalPrice").html(a)), t(".fixedBuyBarProductTitle a:first").text(n)
    }

    function p(e) {
        var i = 1;
        return t(e.formSelector + " input[name=quantity]").length > 0 && (i = t(e.formSelector + " input[name=quantity]").val()), "https://" + e.shopURL + "/cart/" + r(e) + ":" + i
    }

    function B(t) {
        return new Promise(function (e) {
            setTimeout(e, t)
        })
    }

    function y(e) {
        1 == e.directToCheckout && t(".fixedBuyBarButton input, .fixedBuyBarButton button").click(function () {
            window.location.replace(p(e))
        }), B(250).then(function () {
            t(".fixedBuyBarButton input, .fixedBuyBarButton button").prop("disabled", t(e.buyButtonSelector).prop("disabled")), t(e.buyButtonSelector).prop("disabled") ? (t(".fixedBuyBarButton input, .fixedBuyBarButton button").text(e.soldOutText), t(".fixedBuyBarButton input, .fixedBuyBarButton button").val(e.soldOutText)) : (t(".fixedBuyBarButton input, .fixedBuyBarButton button").text(e.buyButtonText), t(".fixedBuyBarButton input, .fixedBuyBarButton button").val(e.buyButtonText)), t(e.buyButtonSelector).prop("disabled") ? t(".fixedBuyBarButton input, .fixedBuyBarButton button").css("cursor", "default") : t(".fixedBuyBarButton input, .fixedBuyBarButton button").css("cursor", "pointer"), e.useCustomStyles || (t(".fixedBuyBarButton input, .fixedBuyBarButton button").css("background-color", t(e.buyButtonSelector).css("background-color")), t(".fixedBuyBarButton input, .fixedBuyBarButton button").css("color", t(e.buyButtonSelector).css("color")), t(".fixedBuyBarButton input, .fixedBuyBarButton button").css("border", t(e.buyButtonSelector).css("border")))
        })
    }

    function f(e) {
        var o = e.buyButtonText;
        t(e.buyButtonSelector).prop("disabled") && (o = e.soldOutText);
        var n = t(e.buyButtonSelector).clone().text(o),
            s = 0 != t(e.reviewStarsSelector).length ? t(e.reviewStarsSelector).html() : "", l = "", p = "",
            B = e.productTitle;
        n.is("input") && n.val(o);
        for (var f = 0, b = e.productVariants.length; b > f; f++)e.productVariants[f].id == r(e) && (null != e.productVariants[f].price && (l = c(e.currencySymbol, e.productVariants[f].price)), null != e.productVariants[f].compare_at_price && parseInt(e.productVariants[f].price) < parseInt(e.productVariants[f].compare_at_price) && (p = c(e.currencySymbol, e.productVariants[f].compare_at_price), "shopluvit.myshopify.com" == i() && (p = "")), "Default Title" != e.productVariants[f].title && "Default" != e.productVariants[f].title && (B = e.productTitle + " - " + e.productVariants[f].title, B = B.replace(/<(?:.|\n)*?>/gm, "")));
        var h = !1, g = [];
        if (e.productVariants.length > 1 && (e.onMobile && "full" == e.mobileSettings.mobileDesign || !e.onMobile && e.desktopSettings.showVariants || !e.onMobile && "right" == e.desktopSettings.barPosition) && (g = u(e), h = !0), isOnMobile())switch (e.mobileSettings.mobileDesign) {
            case"mobile":
                t("body").append("<div id='fixedBuyBar' class='mobile'><div class='fixedBuyBarButton'></div></div>");
                break;
            case"full":
                t("body").append("<div id='fixedBuyBar' class='full'><div class='fixedBuyBarVariants'></div><div class='fixedBuyBarButton'></div><div class='fixedBuyBarConfirm'>Product Added!</div><div class='fixedBuyBarPrice'>" + l + "</div><div class='fixedBuyBarOriginalPrice'>" + p + "</div></div>")
        } else"right" == e.desktopSettings.barPosition || "left" == e.desktopSettings.barPosition ? t("body").append("<div id='fixedBuyBar' class='" + e.desktopSettings.barPosition + "'><div class='fixedBuyBarThumbClose'><a href='#'>[x]</a></div><div class='fixedBuyBarThumb'><img src='" + e.productImage + "'></div><div class='fixedBuyBarProductTitle'><a href='#'>" + B + "</a><div class='fixedBuyBarReviews'>" + s + "</div></div><div class='fixedBuyBarVariants'><div class='fixedBuyBarPrice'>" + l + "</div></div><div class='fixedBuyBarButton'></div><div class='fixedBuyBarConfirm'>Product Added!</div></div>") : t("body").append("<div id='fixedBuyBar' class='desktop'><div class='fixedBuyBarThumb'><img src='" + e.productImage + "'></div><div class='fixedBuyBarProductTitle'>" + B + "<div class='fixedBuyBarReviews'>" + s + "</div></div><div class='fixedBuyBarButton'></div><div class='fixedBuyBarConfirm'>Product Added!</div><div class='fixedBuyBarPrice'>" + l + "</div><div class='fixedBuyBarOriginalPrice'>" + p + "</div><div class='fixedBuyBarVariants'></div></div>");
        if (t(".fixedBuyBarButton").html(n), e.desktopSettings.showCompareAt || isOnMobile() && "full" == e.mobileSettings.mobileDesign || t("#fixedBuyBar.desktop div.fixedBuyBarOriginalPrice").remove(), (e.desktopSettings.showQuantity && !isOnMobile() || isOnMobile() && "full" == e.mobileSettings.mobileDesign && e.mobileSettings.showQuantity || !isOnMobile() && "right" == e.desktopSettings.barPosition) && (0 != t(e.formSelector + " input[name=quantity]").length ? "shopluvit.myshopify.com" == i() ? t("#fixedBuyBar").append("<div class='fixedBuyBarQuantity'>" + t(e.formSelector + " input[name=quantity]").clone().prop("outerHTML") + "</div>") : t("div.fixedBuyBarVariants").prepend(t(e.formSelector + " input[name=quantity]:first").clone()) : (t(e.formSelector).append('<input type="hidden" id="fixedBuyBarQuantity" name="quantity" value="1" min="1">'), "shopluvit.myshopify.com" == i() ? t("#fixedBuyBar").append('<div class="fixedBuyBarQuantity"><input type="number" id="fixedBuyBarQuantity" name="quantity" value="1" min="1"></div>') : t("div.fixedBuyBarVariants").prepend('<input type="number" id="fixedBuyBarQuantity" name="quantity" value="1" min="1">')), t("#fixedBuyBar input[name=quantity]").change(function () {
                t(e.formSelector + " input[name=quantity]").val(t(this).val()), y(e)
            }), t(e.formSelector + " input[name=quantity]").change(function () {
                t("#fixedBuyBar input[name=quantity]").val(t(this).val()), y(e)
            }), t(e.formSelector + " button.adjust").click(function () {
                t("#fixedBuyBar input[name=quantity]").val(t(e.formSelector + " input[name=quantity]").val()), y(e)
            })), "pulse" == e.animationType ? t(".fixedBuyBarButton input, .fixedBuyBarButton button").addClass("pulse-button") : "shake" == e.animationType && setInterval(function () {
                    t(".fixedBuyBarButton input, .fixedBuyBarButton button").hasClass("shake-button") ? t(".fixedBuyBarButton input, .fixedBuyBarButton button").removeClass("shake-button") : t(".fixedBuyBarButton input, .fixedBuyBarButton button").addClass("shake-button")
                }, 3e3), "" == e.desktopSettings.paddingLeft || isOnMobile() || "right" == e.desktopSettings.barPosition || "left" == e.desktopSettings.barPosition || t("#fixedBuyBar").css("padding-left", e.desktopSettings.paddingLeft), "" == e.desktopSettings.paddingRight || isOnMobile() || "right" == e.desktopSettings.barPosition || "left" == e.desktopSettings.barPosition || t("div.fixedBuyBarButton").css("margin-right", e.desktopSettings.paddingRight), isOnMobile() ? t("#fixedBuyBar").css("opacity", e.mobileSettings.mobileOpacity) : t("#fixedBuyBar").css("opacity", e.desktopSettings.desktopOpacity), "" != e.styleButtonBackgroundColor && e.useCustomStyles && t("#fixedBuyBar .fixedBuyBarButton input, #fixedBuyBar .fixedBuyBarButton button").css("background-color", e.styleButtonBackgroundColor), "" != e.styleButtonTextColor && e.useCustomStyles && t("#fixedBuyBar .fixedBuyBarButton input, #fixedBuyBar .fixedBuyBarButton button").css("color", e.styleButtonTextColor), "" != e.styleBarBackgroundColor && e.useCustomStyles && t("#fixedBuyBar").css("background-color", e.styleBarBackgroundColor), "" != e.styleBarTextColor && e.useCustomStyles && t("#fixedBuyBar .fixedBuyBarProductTitle a, #fixedBuyBar .fixedBuyBarReviews i, div.fixedBuyBarOriginalPrice, div.fixedBuyBarPrice").css("color", e.styleBarTextColor), e.desktopSettings.paymentOptions && !e.onMobile && t(".fixedBuyBarButton").append('<img src="https://cdn.shopify.com/s/files/1/1482/2104/t/2/assets/payment-logos.png?12256004131392044624" class="payment-logo" />'), t(".fixedBuyBarButton button, .fixedBuyBarButton input, " + e.buyButtonSelector).click(function () {
                "unexpected-deals.myshopify.com" == i() && t("#fixedBuyBar").hide()
            }), t(".fixedBuyBarButton button, .fixedBuyBarButton input").click(function () {
                var o;
                1 == e.directToCheckout ? (o = "Sticky Buy Button: Customer sent straight to checkout", "undefined" != typeof fbq && fbq("track", "InitiateCheckout")) : (o = "Sticky Buy Button: Product added to cart", "undefined" != typeof fbq && fbq("track", "AddToCart")), window.ga && ga.loaded && ga("send", "event", "Sticky Buy Button", o, e.productTitle, Math.round(e.productPrice)), "somethingyouwant1.myshopify.com" == i() || "ddcrocheting.myshopify.com" == i() ? t(".product-single__cart-submit-wrapper button#AddToCart").trigger("click") : "nutracelle.myshopify.com" == i() || "frank-wilder.myshopify.com" == i() ? t(e.buyButtonSelector).trigger("click") : t(e.formSelector).submit()
            }), 1 == e.directToCheckout && y(e), !isOnMobile() && h && g.length > 0 || isOnMobile() && g.length > 0 && "full" == e.mobileSettings.mobileDesign) {
            for (var f = 0, b = g.length; b > f; f++)t(".fixedBuyBarVariants").append(g[f]);
            if ("full" == e.mobileSettings.mobileDesign) {
                if (e.mobileSettings.showQuantity && "shopluvit.myshopify.com" != i())var x = 75; else var x = 10;
                var v = t(window).width() / g.length - x / g.length - 10;
                t("#fixedBuyBar.full select").outerWidth(v)
            }
        }
        m(g), d(e), isOnMobile() && 0 == g.length && "full" == e.mobileSettings.mobileDesign && (t("#fixedBuyBar.full").outerHeight(t(".fixedBuyBarButton input, .fixedBuyBarButton button").outerHeight() + 10), t("#fixedBuyBar input[name=quantity]").length && (t("#fixedBuyBar input[name=quantity]").css("margin-top", 5), t("#fixedBuyBar input[name=quantity]").css("float", "left"))), isOnMobile() && "full" == e.mobileSettings.mobileDesign && t(".full .fixedBuyBarOriginalPrice, .full .fixedBuyBarPrice").css("line-height", t(".fixedBuyBarButton input, .fixedBuyBarButton button").outerHeight() + 5 + "px")
    }

    function m(e) {
        if (e.length)if (isOnMobile())var i = 48; else var i = t(".fixedBuyBarVariants select").outerHeight(); else var i = t(".fixedBuyBarButton input, .fixedBuyBarButton button, fixedBuyBarButton a").outerHeight();
        t("#fixedBuyBar input[name=quantity]").outerHeight(i)
    }

    function b() {
        var e = t("*").filter(function () {
            return "fixed" === t(this).css("position") && "0px" === t(this).css("top") && t(this).is(":visible") && t(this).width() / t("body").width() === 1 && "fixedBuyBar" != t(this).attr("id") && "visible" == t(this).css("visibility") && t(this).css("opacity") > 0 ? this : void 0
        }), i = 0;
        if (e.length > 0)for (var o = 0, a = e.length; a > o; o++)t(e[o]).outerHeight() > i && (i = t(e[o]).outerHeight());
        return i
    }

    function h() {
        return window.innerHeight / 2 - t("#fixedBuyBar").outerHeight() / 2
    }

    function g(e, i) {
        0 == widgetClosed && (e.onMobile ? ("top" == e.mobileSettings.barPosition ? t("#fixedBuyBar").css("top", b(e) + e.mobileSettings.positionOffset + "px") : t("#fixedBuyBar").css("bottom", e.mobileSettings.positionOffset + "px"), t("#fixedBuyBar").css("z-index", e.mobileSettings.zindex)) : ("bottom" == e.desktopSettings.barPosition ? t("#fixedBuyBar").css("bottom", e.desktopSettings.positionOffset + "px") : "top" == e.desktopSettings.barPosition ? t("#fixedBuyBar").css("top", b(e) + e.desktopSettings.positionOffset + "px") : t("#fixedBuyBar").css("top", h()), t("#fixedBuyBar").css("z-index", e.desktopSettings.zindex)), (0 == e.desktopSettings.revealAt && !e.onMobile || 0 == e.mobileSettings.revealAt && e.onMobile) && t("#fixedBuyBar").css("display", "block"), (i >= e.desktopSettings.revealAt && !e.onMobile || i >= e.mobileSettings.revealAt && e.onMobile && "none" == t("#fixedBuyBar").css("display")) && t("#fixedBuyBar").fadeIn(), (i < e.desktopSettings.revealAt && !e.onMobile || i < e.mobileSettings.revealAt && e.onMobile && "block" == t("#fixedBuyBar").css("display")) && t("#fixedBuyBar").fadeOut())
    }

    function x(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t
    }

    function v() {
        return window.location.href + "?" + x(0, 1e4)
    }

    if (-1 != goToProducts() && 0 != goToProducts()) {
        var _, k, S;
        t.getJSON(v(), function (t) {
            _ = t
        }).done(function () {
            t.getJSON(o() + "/bar/show", {shopify_domain: i()}, function (t) {
                k = t
            }).done(function () {
                null != k && k.app_enabled && (isOnMobile() && k.mobile_enabled || !isOnMobile() && k.desktop_enabled) && (S = n(_, k), f(S), g(S, 0), t("body").on({
                    "touchmove scrollstop": function () {
                    }
                }), t(window).resize(function () {
                    isOnMobile() || "top" == S.desktopSettings.barPosition || "bottom" == S.desktopSettings.barPosition ? t("#fixedBuyBar").css("width", "100%") : "left" != S.desktopSettings.barPosition && "right" != S.desktopSettings.barPosition || t("#fixedBuyBar").css("top", h())
                }), t(".fixedBuyBarThumbClose a").click(function (e) {
                    t("#fixedBuyBar").fadeOut(), widgetClosed = !0, e.preventDefault()
                }), t(document).scroll(function () {
                    g(S, t(this).scrollTop())
                }), t(document).ready(function () {
                    S.onMobile ? t.getScript(stickyJSCDN).done(function () {
                        "top" == S.mobileSettings.barPosition ? t("#fixedBuyBar.mobile").sticky({
                            topSpacing: 0,
                            getWidthFrom: "body",
                            responsiveWidth: !0
                        }) : t("#fixedBuyBar.mobile").sticky({
                            bottomSpacing: 0,
                            getWidthFrom: "body",
                            responsiveWidth: !0
                        })
                    }) : t.getScript(stickyJSCDN).done(function () {
                        "bottom" == S.desktopSettings.barPosition ? t("#fixedBuyBar").sticky({
                            bottomSpacing: 0,
                            getWidthFrom: "body",
                            responsiveWidth: !0
                        }) : "right" == S.desktopSettings.barPosition || "left" == S.desktopSettings.barPosition ? t("#fixedBuyBar").sticky({topSpacing: h()}) : t("#fixedBuyBar").sticky({
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