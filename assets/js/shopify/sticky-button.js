(function () {
    var loadScript = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    var myAppJavaScript = function ($) {
        var loadCSS = document.createElement("link");
        loadCSS.type = "text/css";
        loadCSS.rel = "stylesheet";
        loadCSS.media = "all";
        loadCSS.href = "https://www.mkucz.com/assets/css/shopify/sticky-button.css";
        document.getElementsByTagName("head")[0].appendChild(loadCSS);
        $("body").append("<style type='text/css'>#buy-me { bottom: 0;} #buy-me .buy-me-quantity { display: none;} #buy-me .buy-me-btn [type='submit'], #buy-me .buy-me-btn button[name='add'], #buy-me .buy-me-btn button{ -o-animation: big-small 2s infinite linear;-ms-animation: big-small 2s infinite linear;-moz-animation: big-small 2s infinite linear;-webkit-animation: big-small 2s infinite linear;animation: big-small 2s infinite linear;} #buy-me .buy-me-second-btn { display : none !important} .bm-quick-buy-button { background-color:#eeeeee;} .bm-quick-buy-button.bm-top-right .bm-quick-buy { color:#000000;} .bm-quick-buy-button.bm-top-right .bm-quick-buy-button-variants li { color:#000000;background-color:#eeeeee;} @media screen and (max-width: 467px){#buy-me { bottom: 0; top: auto;} #buy-me .buy-me-variants { display: none !important;} #buy-me .buy-me-quantity { display: none;} } </style>");
        $("body").append('<div id="buy-me"><div class="buy-me-thumb-img"><img class="buy-me-thumb" src="https://buy-me.makeprosimp.com/images/no-image.jpg"></div><div class="buy-me-title"><a class="buy-me-title-a buy-me-scroll-top"></a><div class="buy-me-reviews-stars"></div><div class="buy-me-social-media"></div></div><div class="buy-me-additional"><div class="buy-me-second-btn mb-hide" id="buy-me-second-btn-div"><button type="button" name="test" id="buy-me-second-btn">Second</button></div><div class="buy-me-btn" id="buy-me-add-to-cart-div"><button type="submit" name="add" id="buy-me-add-to-cart-btn">Add to Cart</button></div><div class="buy-me-price"></div><div class="buy-me-compare-price"></div><div class="buy-me-quantity"><input type="number" id="buy-me-quantity" min="1" value="1" /></div><div class="buy-me-variants"></div></div><div class="buy-me-second-btn adjust mb-only" id="buy-me-second-btn-div"></div></div>');
        var isMobileEnabled = '1';
        var isDesktopEnabled = '1';
        var isMobileBuyButtonFull = '0';
        var isQuantityEnableMobile = '0';
        var ShopMoneyFormat = '${{amount}}';
        var isVariantLabel = '0';
        var isBMCart = '0';
        /*INSTANT LOAD BUY ME WIDGET*/
        var isInstantLoad = '1';
        /*INSTANT LOAD BUY ME WIDGET*/
        /*SECOND BUTTON VARIABLES START*/
        var isSecondButtonEnable = '0';
        var SecondButtonSelector = '';
        var isDisableAddToCartBtn = '0';
        /*SECOND BUTTON VARIABLAES END*/
        /*ADD ONS BLOCK START*/
        var isURLBasedAddonsActive = '';
        var isProductListingAddonsActive = '';
        /*ADD ONS BLOCK END*/
        /*PRE CODE START*/
        if (window.location.href.indexOf('?bm_on_board_prev=1') > -1) {
            $('body').append('<div id="prev-box-top" class="arrow_box top-bar"><p>Please scroll down to see<br />Buy Me bar here.</p></div>');
            if (isBMCart == '1') {
                $('body').append('<div id="prev-box-sticky" class="arrow_box_sticky bottom-bar"><p>Buy Me Sticky Cart will navigate with your customers on every page and this will reduce your cart abandonment and allow your customers to checkout faster.</p></div>');
            }
            $('#buy-me-cart').addClass('prev-adj-quick-cart');
        }
        /*PRE CODE END*/
        /*REMOVE CART ON CHECKOUT AND THANK YOU PAGES START*/
        if (window.location.href.toLowerCase().indexOf('/checkout.shopify.com/') > -1 || window.location.href.toLowerCase().indexOf('/thank_you') > -1) {
            $('#buy-me-cart').remove();
            $('#buy-me').remove();
            return false;
        }
        /*REMOVE CART ON CHECKOUT AND THANK YOU PAGES END*/
        /*CHECK IF DISABLED META USED IN PAGE THEN DISABLED START*/
        if ($('meta[name="buy-me:active"]').attr('content')) {
            return false;
        }
        /*CHECK IF DISABLED META USED IN PAGE THEN DISABLED END*/
        /* QUICK ADD TO CART BUTTON START */
        var quickAddToCartContainer = '<div class="bm-quick-buy-button bm-top-right"><div class="bm-handle-url" data-handle="##PRODUCT_HANDLE##"><span class="bm-fonts bm-cart bm-quick-buy"></span></div></div>';
        var quickAddToCartContainerUL = '<ul class="bm-quick-buy-button-variants">##VARIANT_CONTAINER##</ul>';
        var quickAddToCartContainerLI = '<li data-vid="##VARIANT_ID##" data-pprice="##P_PRICE##">##VARIANT_NAME##</li>';
        var getRootUrl = function () {
            return window.location.origin ? window.location.origin + '/' : window.location.protocol + '/' + window.location.host + '/';
        };
        var ValidPageForWidget = function () {
            var CurrentURL = window.location.href;
            var LastKeyword = CurrentURL.replace(getRootUrl(), '');
            if (LastKeyword.indexOf('cart') >= 0) {
                return false;
            }
            return true;
        };
        var AnchorObj = function (ImageObject) {
            var imgAnchor = $(ImageObject).closest('a');
            if (imgAnchor.index() == -1) imgAnchor = $(ImageObject).parent().find('a:first');
            return imgAnchor;
        };
        var CheckProductOrNot = function (ImageObject) {
            var imgSRC = $(ImageObject).attr('src');
            if (imgSRC == null) {
                imgSRC = $(ImageObject).attr('srcset');
            }
            if (imgSRC != null) {
                var imgMatch = imgSRC.match(/(\/products.*)+(?=\.)/);
                if (imgMatch != null && imgMatch[0] != null && imgMatch[0].length > 2) {
                    var imgAnchor = AnchorObj(ImageObject);
                    var parentLink = $(imgAnchor).attr('href');
                    parentLink += '?';
                    var productHandle = parentLink.match(/\/products\/(.*?)\?/);
                    if (productHandle != null && productHandle[1] != null) {
                        if (ValidPageForWidget()) {
                            var productHandleInner = productHandle[1];
                            if (productHandleInner.indexOf('.') > -1) return false; else return productHandle[1];
                        }
                    }
                }
            }
            return false;
        };
        var CreateQuickBuyPurchaseWidget = function () {
            $('img').each(function () { /*CHECK IMAGE OBJECT VALID OR NOT START*/
                var CurrentProductHandle = CheckProductOrNot($(this));
                /*CHECK IMAGE OBJECT VALID OR NOT END*/
                if (CurrentProductHandle != false) {
                    var AnchorObject = AnchorObj($(this));
                    if (!AnchorObject.hasClass('bm-quick-buy-block')) {
                        AnchorObject.addClass('bm-quick-buy-block');
                        AnchorObject.attr('data-handle', CurrentProductHandle);
                        AnchorObject.attr('data-isused', '0');
                        if (AnchorObject.closest('#ajaxifyCart').index() == -1) {
                            quickContainer = quickAddToCartContainer.replace('##PRODUCT_HANDLE##', CurrentProductHandle);
                            $(quickContainer).insertAfter(AnchorObject);
                            AnchorObject.parent().css('position', 'relative');
                        }
                    }
                }
            });
        };
        /* Call forcefully */
        CreateQuickBuyPurchaseWidget();
        $(window).scroll(function () {
            CreateQuickBuyPurchaseWidget();
        });
        $('body').on('click', '.bm-handle-url', function () {
            var objThis = this;
            if ($(objThis).next('.bm-quick-buy-button-variants').index() > -1) {
                $(objThis).find('.bm-quick-buy').removeClass('bm-fa-fonts bm-close').addClass('bm-fonts bm-cart');
                $(objThis).next('.bm-quick-buy-button-variants').fadeOut(500, function () {
                    $(objThis).next('.bm-quick-buy-button-variants').remove();
                });
            } else {
                $('.bm-quick-buy-button-variants').remove();
                $('.bm-handle-url').find('.bm-quick-buy').removeClass('bm-fa-fonts bm-close').addClass('bm-fonts bm-cart');
                $(this).find('.bm-quick-buy').removeClass('bm-fonts bm-cart').addClass('bm-fa-fonts bm-refresh bm-spin');
                var CartProductURL = '//' + window.location.hostname + '/products/' + $(this).attr('data-handle') + '.json';
                $.getJSON(CartProductURL, function (cartResp) {
                    if (cartResp.product.variants.length == 1) {
                        var SelectedVariantId = cartResp.product.variants[0].id;
                        var CartProductAddURL = 'https://' + window.location.hostname + '/cart/add.js';
                        var ProductPrice = 0;
                        try {
                            ProductPrice = parseFloat(cartResp.product.variants[0].price);
                        } catch (e) {
                            ProductPrice = 0;
                        }
                        $.post(CartProductAddURL, {id: SelectedVariantId, quantity: 1}, function (cartResp) {
                            $(objThis).find('.bm-quick-buy').fadeOut(500, function () {
                                $(objThis).find('.bm-quick-buy').removeClass('bm-fa-fonts bm-refresh bm-spin').addClass('bm-fa-fonts bm-check');
                                $(objThis).find('.bm-quick-buy').fadeIn(1000, function () {
                                    $(objThis).find('.bm-quick-buy').fadeOut(500, function () {
                                        $(objThis).find('.bm-quick-buy').removeClass('bm-fa-fonts bm-check').addClass('bm-fonts bm-cart');
                                        $(objThis).find('.bm-quick-buy').fadeIn(1000, function () {
                                            if (1 == 2) window.location.href = '//' + window.location.hostname + '/cart'; else if (1 == 3) window.location.href = '//' + window.location.hostname + '/checkout?locale=undefined';
                                        });
                                    });
                                });
                            });
                            /* if(1 == 2) window.location.href = '//' + window.location.hostname + '/cart'; else if(1 == 3) window.location.href = '//' + window.location.hostname + '/checkout?locale=undefined'; else { } */
                        }, 'json').fail(function (respFail) {
                            $(objThis).find('.bm-quick-buy').fadeOut(500, function () {
                                $(objThis).find('.bm-quick-buy').removeClass('bm-fa-fonts bm-refresh bm-spin').addClass('bm-fonts bm-cart');
                                $(objThis).find('.bm-quick-buy').fadeIn(500);
                            });
                            var FailRespArray = respFail.responseText.split(',');
                            var FailDescriptionArray = FailRespArray[FailRespArray.length - 1].split(':');
                            alert(FailDescriptionArray[1].replace(/"/g, '').replace('}', ''));
                        });
                    } else {
                        var li = '';
                        cartResp.product.variants.forEach(function (item) {
                            var liInner = quickAddToCartContainerLI;
                            liInner = liInner.replace('##VARIANT_ID##', item.id).replace('##VARIANT_NAME##', item.title).replace('##P_PRICE##', item.price);
                            li += liInner;
                        });
                        var ul = '';
                        if (li != '') {
                            var ulInner = quickAddToCartContainerUL;
                            ulInner = ulInner.replace('##VARIANT_CONTAINER##', li);
                            ul = ulInner;
                        }
                        if ($(objThis).next('.bm-quick-buy-button-variants').index() > -1) $(objThis).next('.bm-quick-buy-button-variants').remove();
                        $(ul).insertAfter($(objThis).closest('.bm-handle-url'));
                        var width = $(objThis).closest('.bm-quick-buy-button').parent().width(), adjustment = 10;
                        $(objThis).next('.bm-quick-buy-button-variants').css('width', (width - adjustment));
                        $(objThis).next('.bm-quick-buy-button-variants').fadeIn(500);
                        $(objThis).find('.bm-quick-buy').removeClass('bm-refresh bm-spin').addClass('bm-close');
                    }
                });
            }
        });
        $('body').on('click', '.bm-quick-buy-button-variants li', function () {
            var SelectedVariantId = $(this).attr('data-vid'), objThis = this;
            var CartProductAddURL = 'https://' + window.location.hostname + '/cart/add.js';
            var ProductPrice = 0;
            try {
                ProductPrice = parseFloat($(this).attr('data-pprice'));
            } catch (e) {
                ProductPrice = 0;
            }
            $(this).parent().prev('.bm-handle-url').find('.bm-quick-buy').removeClass('bm-close').addClass('bm-refresh bm-spin');
            $(this).parent().hide();
            $.post(CartProductAddURL, {id: SelectedVariantId, quantity: 1}, function (cartResp) {
                var bm_quick_buy = $(objThis).parent().prev('.bm-handle-url').find('.bm-quick-buy');
                bm_quick_buy.fadeOut(500, function () {
                    bm_quick_buy.removeClass('bm-fa-fonts bm-refresh bm-spin').addClass('bm-fa-fonts bm-check');
                    bm_quick_buy.fadeIn(1000, function () {
                        bm_quick_buy.fadeOut(500, function () {
                            bm_quick_buy.removeClass('bm-fa-fonts bm-check').addClass('bm-fonts bm-cart');
                            bm_quick_buy.fadeIn(1000, function () {
                                $(objThis).parent().remove();
                                if (1 == 2) window.location.href = '//' + window.location.hostname + '/cart'; else if (1 == 3) window.location.href = '//' + window.location.hostname + '/checkout?locale=undefined';
                            });
                        });
                    });
                });
                /* if(1 == 2) window.location.href = '//' + window.location.hostname + '/cart'; else if(1 == 3) window.location.href = '//' + window.location.hostname + '/checkout?locale=undefined'; else { } */
            }, 'json').fail(function (respFail) {
                var bm_quick_buy = $(objThis).parent().prev('.bm-handle-url').find('.bm-quick-buy');
                bm_quick_buy.fadeOut(500, function () {
                    bm_quick_buy.removeClass('bm-fa-fonts bm-refresh bm-spin').addClass('bm-fonts bm-cart');
                    bm_quick_buy.fadeIn(500);
                    $(objThis).parent().remove();
                });
                var FailRespArray = respFail.responseText.split(',');
                var FailDescriptionArray = FailRespArray[FailRespArray.length - 1].split(':');
                alert(FailDescriptionArray[1].replace(/"/g, '').replace('}', ''));
            });
        });
        /* QUICK ADD TO CART BUTTON END */
        /* Cart Widget Refresh Start */
        $(document).ajaxComplete(function (event, xhr, options) {
            try {
                if (options.url.indexOf('/cart/add.js') > -1) { /* Ajax Cart Count Increase Start */
                    try {
                        $.getJSON('/cart.json', function (respCart) {
                            if (respCart) {
                                $('#buy-me-cart #bm-cart-count').html(respCart.item_count);
                                $('#buy-me-cart #bm-cart-count').addClass('added');
                                setTimeout(function () {
                                    $('#buy-me-cart #bm-cart-count').removeClass('added');
                                }, 2000);
                            }
                        });
                    } catch (e) {
                    }
                    /* Ajax Cart Count Increase End */
                }
            } catch (e) {
            }
        });
        /* Cart Widget Refresh End */
        if ($(window).width() <= 768) {
            if (isMobileEnabled == '0') {
                if (isProductListingAddonsActive != '1') {
                    return false;
                }
            }
        } else {
            if (isDesktopEnabled == '0') {
                if (isProductListingAddonsActive != '1') {
                    return false;
                }
            }
        }
        /*SET IMAGE START*/
        var fn_setProductImage = function (para_productImage) {
            if (para_productImage !== null) {
                return para_productImage.replace(/.jpg([^.jpg]*)$/, '_thumb.jpg' + '$1').replace(/.jpeg([^.jpeg]*)$/, '_thumb.jpeg' + '$1').replace(/.png([^.png]*)$/, '_thumb.png' + '$1').replace(/.gif([^.gif]*)$/, '_thumb.gif' + '$1').replace(/.svg([^.svg]*)$/, '_thumb.svg' + '$1').replace(/.JPG([^.JPG]*)$/, '_thumb.JPG' + '$1').replace(/.JPEG([^.JPEG]*)$/, '_thumb.JPEG' + '$1').replace(/.PNG([^.PNG]*)$/, '_thumb.PNG' + '$1').replace(/.GIF([^.GIF]*)$/, '_thumb.GIF' + '$1').replace(/.SVG([^.SVG]*)$/, '_thumb.SVG' + '$1');
            }
            return 'https://buy-me.makeprosimp.com/images/no-image.jpg';
        };
        /*SET IMAGE END*/
        var isProductPage = false;
        var isBlogPageOrSite = false;
        var productUrl = window.location.href;
        if (productUrl.indexOf('/products/') == -1) {
            isProductPage = false;
            isBlogPageOrSite = true;
        } else if (productUrl.indexOf('/products/') > -1) {
            isProductPage = true;
        }
        if (isBlogPageOrSite && isURLBasedAddonsActive == '1') {
            var BlogUrl = productUrl.replace('https://', '').replace('http://', '');
            var BlogUrlArray = BlogUrl.split('/');
            var LastKeyword = '';
            if (BlogUrlArray[BlogUrlArray.length - 1] == '') {
                LastKeyword = BlogUrlArray[BlogUrlArray.length - 2];
            } else {
                LastKeyword = BlogUrlArray[BlogUrlArray.length - 1];
            }
            /*GET CURRENT BLOG PRODUCT START*/
            var ReqUrl = 'https://buy-me.makeprosimp.com/app/get-blog-product-detail';
            var DataVal = {
                method: 'get_blog_product_detail',
                shop: 'doers-outdoors.myshopify.com',
                blog_url: LastKeyword
            };
            $.get(ReqUrl, DataVal, function (respData) {
                if (respData.length > 0) {
                    var ProductHandle = respData[0].product_handle;
                    var ShopifyReqURL = 'https://doers-outdoors.myshopify.com/products/' + ProductHandle + '.json';
                    /*GET SHOPIFY PRODUCT DETAIL START*/
                    $.getJSON(ShopifyReqURL, function (ShopifyProdRespData) {
                        var ShopifyProductName = ShopifyProdRespData.product.title;
                        var ShopifyProductImageSrc = ShopifyProdRespData.product.image.src;
                        var ShopifyProductOptions = ShopifyProdRespData.product.options;
                        var ShopifyProductVariants = ShopifyProdRespData.product.variants;
                        var ShopifyProductVariantsImages = ShopifyProdRespData.product.images;
                        var ShopifyProductHandle = ShopifyProdRespData.product.handle;
                        $('#buy-me').find('.buy-me-title-a').html(ShopifyProductName);
                        $('#buy-me').find('.buy-me-title-a').attr('href', 'https://doers-outdoors.myshopify.com/products/' + ProductHandle);
                        /*BIND IMAGE START*/
                        var imgLoader = $('#buy-me').find('.buy-me-thumb').attr('src', ShopifyProductImageSrc);
                        imgLoader.on('load', function () {
                            if (isMobileBuyButtonFull == '0' || $(window).width() > 465) {
                                if ($('#buy-me .buy-me-thumb-img').height() > $('#buy-me .buy-me-title').height()) {
                                    $('#buy-me .buy-me-additional').css('height', $('#buy-me .buy-me-thumb-img').height() + 'px');
                                } else {
                                    $('#buy-me .buy-me-additional').css('height', $('#buy-me .buy-me-title').height() + 'px');
                                }
                            }
                        });
                        /*BIND IMAGE END*/
                        /*VARIANT OPTIONS BIND START*/
                        var DynaOptions = '';
                        for (i = 0; i < ShopifyProductOptions.length; i++) {
                            if (ShopifyProductOptions[i].name != 'Title') {
                                var tempDyna = '<div class=\'buy-me-variants-wrap\'>';
                                if (isVariantLabel == '0') {
                                    tempDyna += '<label style=\'display:none;\'>' + ShopifyProductOptions[i].name + '</label>';
                                } else {
                                    tempDyna += '<label>' + ShopifyProductOptions[i].name + '</label>';
                                }
                                tempDyna += '<select class=\'single-option-selector\' data-option=\'option' + (i + 1) + '\' id=\'productSelect-option-' + i + '\'></select>';
                                tempDyna += '</div>';
                                DynaOptions += tempDyna;
                            }
                        }
                        $('#buy-me').find('.buy-me-variants').html(DynaOptions);
                        var SelectOption1 = '';
                        var SelectOption2 = '';
                        var SelectOption3 = '';
                        var SelectOption1Array = '';
                        var SelectOption2Array = '';
                        var SelectOption3Array = '';
                        for (i = 0; i < ShopifyProductOptions.length; i++) {
                            if (ShopifyProductVariants[i].option1 != '' && ShopifyProductVariants[i].option1 != null && SelectOption1Array == '' && i == 0) {
                                SelectOption1Array = ShopifyProductOptions[i].values;
                            }
                            if (ShopifyProductVariants[i].option2 != '' && ShopifyProductVariants[i].option2 != null && SelectOption2Array == '' && i == 1) {
                                SelectOption2Array = ShopifyProductOptions[i].values;
                            }
                            if (ShopifyProductVariants[i].option3 != '' && ShopifyProductVariants[i].option3 != null && SelectOption3Array == '' && i == 2) {
                                SelectOption3Array = ShopifyProductOptions[i].values;
                            }
                        }
                        if (SelectOption1Array.length > 0) {
                            for (i = 0; i < SelectOption1Array.length; i++) {
                                SelectOption1 += '<option value=\'' + SelectOption1Array[i] + '\'>' + SelectOption1Array[i] + '</option>';
                            }
                        }
                        if (SelectOption2Array.length > 0) {
                            for (i = 0; i < SelectOption2Array.length; i++) {
                                SelectOption2 += '<option value=\'' + SelectOption2Array[i] + '\'>' + SelectOption2Array[i] + '</option>';
                            }
                        }
                        if (SelectOption3Array.length > 0) {
                            for (i = 0; i < SelectOption3Array.length; i++) {
                                SelectOption3 += '<option value=\'' + SelectOption3Array[i] + '\'>' + SelectOption3Array[i] + '</option>';
                            }
                        }
                        if (SelectOption1 != '') {
                            $('select[data-option=\'option1\']').html(SelectOption1);
                        }
                        if (SelectOption2 != '') {
                            $('select[data-option=\'option2\']').html(SelectOption2);
                        }
                        if (SelectOption3 != '') {
                            $('select[data-option=\'option3\']').html(SelectOption3);
                        }
                        /*VARIANT OPTIONS BIND END*/
                        /*BIND MASTER DROPDOWN START*/
                        var MasterDropdown = '<div class=\'buy-me-variants-wrap\'>';
                        MasterDropdown += '<select name=\'id\' id=\'productSelect\' class=\'product-single__variants\' style=\'display: none !important;\'>';
                        var isFirstMaster = true;
                        for (i = 0; i < ShopifyProductVariants.length; i++) {
                            var isAvailable = 0;
                            if (ShopifyProductVariants[i].inventory_policy == 'deny' && ShopifyProductVariants[i].inventory_management == 'shopify') {
                                isAvailable = ShopifyProductVariants[i].inventory_quantity;
                            } else {
                                isAvailable = 1;
                            }
                            if (isFirstMaster) {
                                MasterDropdown += '<option value=\'' + ShopifyProductVariants[i].id + '\' data-price=\'' + ShopifyProductVariants[i].price + '\' data-comprice=\'' + ShopifyProductVariants[i].compare_at_price + '\' data-isavailable=\'' + isAvailable + '\' data-imgid=\'' + ShopifyProductVariants[i].image_id + '\' selected>' + ShopifyProductVariants[i].title + '</option>';
                                isFirstMaster = false;
                            } else {
                                MasterDropdown += '<option value=\'' + ShopifyProductVariants[i].id + '\' data-price=\'' + ShopifyProductVariants[i].price + '\' data-comprice=\'' + ShopifyProductVariants[i].compare_at_price + '\' data-isavailable=\'' + isAvailable + '\' data-imgid=\'' + ShopifyProductVariants[i].image_id + '\'>' + ShopifyProductVariants[i].title + '</option>';
                            }
                        }
                        MasterDropdown += '</select>';
                        MasterDropdown += '</div>';
                        $('#buy-me').find('.buy-me-variants').append(MasterDropdown);
                        /*BIND MASTER DROPDOWN END*/
                        /*BIND IMAGES FOR FOR VARIANTS START*/
                        var ImagesDropDown = '<div class=\'buy-me-variants-wrap\'>';
                        ImagesDropDown += '<select name=\'drp_var_images\' id=\'drp_var_images\' style=\'display: none !important;\'>';
                        for (i = 0; i < ShopifyProductVariantsImages.length; i++) {
                            ImagesDropDown += '<option value=\'' + ShopifyProductVariantsImages[i].id + '\'>' + ShopifyProductVariantsImages[i].src + '</option>';
                        }
                        ImagesDropDown += '</select>';
                        ImagesDropDown += '</div>';
                        $('#buy-me').find('.buy-me-variants').append(ImagesDropDown);
                        /*BIND IMAGES FOR FOR VARIANTS END*/
                        /*BIND FIRST PRICE START*/
                        var FirstDefaultPrice = $('#productSelect option:selected').attr('data-price');
                        var FirstDefaultComPrice = $('#productSelect option:selected').attr('data-comprice');
                        var FirstDefaultImgId = $('#productSelect option:selected').attr('data-imgid');
                        $('#buy-me').find('.buy-me-price').html((ShopMoneyFormat.replace('{{amount}}', FirstDefaultPrice)).replace('.00', ''));
                        $('#buy-me').find('.buy-me-price').attr('data-org_price', FirstDefaultPrice.replace('.00', ''));
                        if (FirstDefaultComPrice != 'null' && FirstDefaultComPrice != '') {
                            $('#buy-me').find('.buy-me-compare-price').html((ShopMoneyFormat.replace('{{amount}}', FirstDefaultComPrice)).replace('.00', ''));
                        }
                        if (FirstDefaultImgId != '' || FirstDefaultImgId != null) {
                            $('#drp_var_images option').each(function () {
                                if ($(this).val() == FirstDefaultImgId) {
                                    $('#buy-me').find('.buy-me-thumb').attr('src', $(this).text());
                                }
                            });
                        }
                        var FirstDefaultQty = $('#productSelect option:selected').attr('data-isavailable');
                        if (FirstDefaultQty == '0') {
                            $('#buy-me').find('#buy-me-add-to-cart-btn').html('Sold Out');
                            $('#buy-me').find('#buy-me-add-to-cart-btn').prop('disabled', true);
                            $('#buy-me').find('#buy-me-add-to-cart-btn').addClass('disabled');
                            $('#buy-me-add-to-cart-div').addClass('buy-me-disabled');
                        }
                        /*BIND FIRST PRICE END*/
                        /* Social Media Start */
                        if (0) {
                            var ShareURL = 'https://doers-outdoors.myshopify.com/products/' + ShopifyProductHandle;
                            $('#buy-me .buy-me-share.fac-link').attr('href', 'https://www.facebook.com/sharer.php?u=' + ShareURL);
                            $('#buy-me .buy-me-share.twi-link').attr('href', 'https://twitter.com/share?url=' + ShareURL);
                            $('#buy-me .buy-me-share.ggl-link').attr('href', 'https://plus.google.com/share?url=' + ShareURL);
                            $('#buy-me .buy-me-share.lki-link').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + ShareURL);
                            $('#buy-me .buy-me-share.ptt-link').attr('href', 'https://pinterest.com/pin/create/button/?url=' + ShareURL);
                            $('#buy-me .buy-me-share.tbl-link').attr('href', 'https://www.tumblr.com/share/link?url=' + ShareURL);
                            if ($(window).width() < 768) {
                                $('#buy-me .buy-me-share.whts-link').attr('data-text', ShopifyProductName);
                                $('#buy-me .buy-me-share.whts-link').attr('data-link', ShareURL);
                            }
                        }
                        /* Social Media End */
                        /*ONLY BLOG PAGE OR BLOG SITE CLASS START*/
                        $('#buy-me').find('#buy-me-add-to-cart-btn').addClass('buy-me-blog-page-site');
                        /*ONLY BLOG PAGE OR BLOG SITE CLASS END*/
                        if ($(window).width() < 768) {
                            getVariants();
                        }
                        if (false) {
                            $('#buy-me-add-to-cart-div').find('.buy-me-blog-page-site').html('');
                        }
                        /*SET WIDTH OF TITLE START*/
                        var buy_me = $('#buy-me').width(), buy_me_thumb_img = $('.buy-me-thumb-img').width(),
                            buy_me_title = $('.buy-me-title').width(),
                            buy_me_additional = $('.buy-me-additional').width(),
                            actual_containers_width = buy_me_thumb_img + buy_me_additional, maintain_gap = 10;
                        if (buy_me_title <= 0) $('.buy-me-title').removeAttr('style');
                        buy_me_title = buy_me / 2;
                        $('.buy-me-title').css('width', parseFloat(buy_me_title));
                        /*SET WIDTH OF TITLE END*/
                        $('#buy-me').addClass('active');
                        $('#buy-me').show();
                    });
                    /*GET SHOPIFY PRODUCT DETAIL END*/
                } else {
                    if (isProductListingAddonsActive != '1') {
                        return false;
                    }
                }
            });
            /*GET CURRENT BLOG PRODUCT END*/
            $('#buy-me').on('change', '.single-option-selector', function () {
                var CurrentSelectedVariant = '';
                $('.single-option-selector').each(function () {
                    CurrentSelectedVariant += $(this).val() + ',';
                });
                var CheckVal = (CurrentSelectedVariant.substring(0, CurrentSelectedVariant.length - 1)).replace(/,/g, ' / ');
                var nextPrice = 0;
                var selQty = 0;
                var imgId = '';
                $('#productSelect option').each(function () {
                    if ($(this).text() == CheckVal) {
                        nextPrice = $(this).attr('data-price');
                        $(this).attr('selected', 'selected');
                        selQty = $(this).attr('data-isavailable');
                        imgId = $(this).attr('data-imgid')
                    } else {
                        $(this).removeAttr('selected');
                    }
                });
                if (imgId != '') {
                    var productImage = '';
                    $('#drp_var_images option').each(function () {
                        if ($(this).val() == imgId) {
                            productImage = $(this).text();
                        }
                    });
                    if (productImage != '') {
                        productImage = fn_setProductImage(productImage);
                        $('#buy-me').find('.buy-me-thumb').attr('src', productImage);
                    }
                }
                if (parseFloat(nextPrice) != 0) {
                    $('#buy-me').find('.buy-me-price').html((ShopMoneyFormat.replace('{{amount}}', nextPrice)).replace('.00', ''));
                    $('#buy-me').find('.buy-me-price').attr('data-org_price', nextPrice.replace('.00', ''));
                    $('#buy-me').find('#buy-me-add-to-cart-btn').prop('disabled', false);
                    if (false) {
                        $('#buy-me').find('#buy-me-add-to-cart-btn').html('');
                    } else {
                        $('#buy-me').find('#buy-me-add-to-cart-btn').html('Add to Cart');
                    }
                    $('#buy-me').find('#buy-me-add-to-cart-btn').removeClass('disabled');
                    $('#buy-me-add-to-cart-div').removeClass('buy-me-disabled');
                } else {
                    $('#buy-me').find('#buy-me-add-to-cart-btn').prop('disabled', true);
                    $('#buy-me').find('#buy-me-add-to-cart-btn').html('Sold Out');
                    $('#buy-me').find('#buy-me-add-to-cart-btn').prop('disabled', true);
                    $('#buy-me').find('#buy-me-add-to-cart-btn').addClass('disabled');
                    $('#buy-me-add-to-cart-div').addClass('buy-me-disabled');
                }
                if (selQty == '0') {
                    $('#buy-me').find('#buy-me-add-to-cart-btn').html('Sold Out');
                    $('#buy-me').find('#buy-me-add-to-cart-btn').prop('disabled', true);
                    $('#buy-me').find('#buy-me-add-to-cart-btn').addClass('disabled');
                    $('#buy-me-add-to-cart-div').addClass('buy-me-disabled');
                }
                if ($(window).width() < 768) {
                    getVariants();
                }
            });
            $('#buy-me').on('click', '#buy-me-add-to-cart-btn', function () {
                var SelectedProductId = $('#buy-me').find('#productSelect').val();
                var ProductQuantity = $('#buy-me').find('#buy-me-quantity').val();
                var ProductPrice = $('#buy-me').find('#productSelect option:selected').attr('data-price');
                var ProductTitle = $('#buy-me').find('.buy-me-title-a').attr('href');
                var CartProductAddURL = 'https://doers-outdoors.myshopify.com/cart/add.js';
                var CartURL = 'https://doers-outdoors.myshopify.com/cart';
                $.post(CartProductAddURL, {id: SelectedProductId, quantity: ProductQuantity}, function (CartResp) {
                    var URL = ProductTitle.split('/')[ProductTitle.split('/').length - 1], prod_price = 0;
                    URL = URL.split('?')[0];
                    try {
                        prod_price = parseFloat(ProductPrice);
                    } catch (e) {
                        prod_price = 0;
                    }
                    window.location.href = CartURL;
                }, 'json').fail(function (respFail) {
                    var FailRespArray = respFail.responseText.split(',');
                    var FailDescriptionArray = FailRespArray[FailRespArray.length - 1].split(':');
                    alert(FailDescriptionArray[1].replace(/"/g, '').replace('}', ''));
                });
            });
            var getVariants = function () {
                if (0 || 0) {
                    if ($('#buy-me .buy-me-additional').find('.buy-me-variants select').length == 3 && $(window).width() < 1684) {
                        if ($('#buy-me .buy-me-additional').find('.buy-me-variants').length > 0) {
                            var variantContainer = $('#buy-me .buy-me-additional').find('.buy-me-variants').clone();
                            $('#buy-me').find('.buy-me-variants').remove();
                            $(variantContainer).insertAfter('#buy-me .buy-me-additional');
                            $('#buy-me').find('.buy-me-variants').addClass('adjust');
                        }
                    } else if ($('#buy-me .buy-me-additional').find('.buy-me-variants select').length == 2 && $(window).width() < 1520) {
                        if ($('#buy-me .buy-me-additional').find('.buy-me-variants').length > 0) {
                            var variantContainer = $('#buy-me .buy-me-additional').find('.buy-me-variants').clone();
                            $('#buy-me').find('.buy-me-variants').remove();
                            $(variantContainer).insertAfter('#buy-me .buy-me-additional');
                            $('#buy-me').find('.buy-me-variants').addClass('adjust');
                        }
                    } else if ($('#buy-me .buy-me-additional').find('.buy-me-variants select').length == 1 && $(window).width() < 1352) {
                        if ($('#buy-me .buy-me-additional').find('.buy-me-variants').length > 0) {
                            var variantContainer = $('#buy-me .buy-me-additional').find('.buy-me-variants').clone();
                            $('#buy-me').find('.buy-me-variants').remove();
                            $(variantContainer).insertAfter('#buy-me .buy-me-additional');
                            $('#buy-me').find('.buy-me-variants').addClass('adjust');
                        }
                    } else if ($(window).width() < 768) {
                        if ($('#buy-me .buy-me-additional').find('.buy-me-variants').length > 0) {
                            var variantContainer = $('#buy-me .buy-me-additional').find('.buy-me-variants').clone();
                            $('#buy-me').find('.buy-me-variants').remove();
                            $(variantContainer).insertAfter('#buy-me .buy-me-additional');
                        }
                    }
                }
            };
        } else if (isProductPage) { /*console.log(window.location.href);*/
            /*CHECK SECOND SELECTOR BUTTON IS ON OR OFF START*/
            if (isSecondButtonEnable == '1' && SecondButtonSelector != '') {
                $('#buy-me .buy-me-second-btn').html($(SecondButtonSelector).clone());
                /*CHECK ADD BUTTON ENABLE OR NOT START*/
                if (isDisableAddToCartBtn == '1') {
                    $('#buy-me .buy-me-second-btn.mb-hide').removeClass('mb-hide');
                    $('#buy-me .buy-me-second-btn.mb-only').remove();
                }
                /*CHECK ADD BUTTON ENABLE OR NOT END*/
                /*REGISTER CLICK EVENT OF SECOND BUTTON START*/
                $('body').on('click', '.buy-me-second-btn', function (e) {
                    $(SecondButtonSelector + ':first').click();
                });
                /*REGISTER CLICK EVENT OF SECOND BUTTON END*/
            }
            /*CHECK SECOND SELECTOR BUTTON IS ON OR OFF END*/
            var changeBuyButton = function () {
                if (getAddToCartBtnObj().index() > -1) {
                    $('#buy-me-add-to-cart-div').html(getAddToCartBtnObj().clone());
                    if ($('#buy-me-add-to-cart-div [type=\'submit\']').index() > -1) {
                        if ($('#buy-me-add-to-cart-div [type=\'submit\']').hasClass('disabled') || $('#buy-me-add-to-cart-div [type=\'submit\']').is('[disabled]')) $('#buy-me-add-to-cart-div').addClass('buy-me-disabled'); else $('#buy-me-add-to-cart-div').removeClass('buy-me-disabled');
                    } else if ($('#buy-me-add-to-cart-div button[name=\'add\']').index() > -1) {
                        if ($('#buy-me-add-to-cart-div button[name=\'add\']').hasClass('disabled') || $('#buy-me-add-to-cart-div button[name=\'add\']').is('[disabled]')) $('#buy-me-add-to-cart-div').addClass('buy-me-disabled'); else $('#buy-me-add-to-cart-div').removeClass('buy-me-disabled');
                    } else $('#buy-me-add-to-cart-div').removeClass('buy-me-disabled');
                    if (isMobileBuyButtonFull == '0' || $(window).width() > 465) {
                        if ($('#buy-me .buy-me-thumb-img').height() > $('#buy-me .buy-me-title').height()) {
                            $('#buy-me .buy-me-additional').css('height', $('#buy-me .buy-me-thumb-img').height() + 'px');
                        } else {
                            $('#buy-me .buy-me-additional').css('height', $('#buy-me .buy-me-title').height() + 'px');
                        }
                    }
                }
            };
            if (false) {
                var getQtyBox = function () {
                    if ($('form[action=\'/cart/add\']:first').find('[name=\'quantity\']').index() > -1) {
                        var qtyBox = $('form[action=\'/cart/add\']:first').find('[name=\'quantity\']');
                        $('#buy-me-quantity').val(qtyBox.val());
                    } else if ($('form[id=\'add-to-cart-form\']:first').find('[name=\'quantity\']').index() > -1) {
                        var qtyBox = $('form[id=\'add-to-cart-form\']:first').find('[name=\'quantity\']');
                        $('#buy-me-quantity').val(qtyBox.val());
                    } else {
                        $('form[action=\'/cart/add\']:first').append('<input type=\'hidden\' name=\'quantity\' />');
                        var qtyBox = $('form[action=\'/cart/add\']:first').find('[name=\'quantity\']');
                        qtyBox.val($('#buy-me-quantity').val());
                    }
                };
                var onQtyChange = function () {
                    if ($('form[action=\'/cart/add\']:first').find('[name=\'quantity\']').index() > -1) {
                        var qtyBox = $('form[action=\'/cart/add\']:first').find('[name=\'quantity\']');
                        qtyBox.val($('#buy-me-quantity').val());
                    } else if ($('form[id=\'add-to-cart-form\']:first').find('[name=\'quantity\']').index() > -1) {
                        var qtyBox = $('form[id=\'add-to-cart-form\']:first').find('[name=\'quantity\']');
                        qtyBox.val($('#buy-me-quantity').val());
                    }
                };
                if ('oninput' in window) {
                    $('.buy-me-quantity').on('input', '#buy-me-quantity', function () {
                        onQtyChange();
                    });
                } else {
                    $('.buy-me-quantity').on('keyup mouseup', '#buy-me-quantity', function () {
                        onQtyChange();
                    });
                }
            }
            var getRatings = function () { /* Review Enable Start */
                if (0 > 0) {
                    if ($('#buy-me').find('.buy-me-reviews-stars').html() == '') { /*CHECK LOOKS REVIEW STAR EXIST OR NOT START*/
                        if ($('a[href="#looxReviews"]').index() > -1) {
                            var LooksReviewStart = $('a[href="#looxReviews"]:first').clone();
                            $('#buy-me').find('.buy-me-reviews-stars').append(LooksReviewStart);
                        } else if ($('#container-ryviu').index() > -1) {
                            productRatings = $('').clone();
                            $('#buy-me').find('.buy-me-reviews-stars').html(productRatings);
                        } else {
                            productRatings = $('').html();
                            /*$.ajax({ url: $('#looxReviewsFrame').attr('src'), jsonp: 'callback', dataType: 'jsonp', success: function(response) { console.log($(response).find('#header').html()); } });*/
                            $('#buy-me').find('.buy-me-reviews-stars').html(productRatings);
                        }
                        /*CHECK LOOKS REVIEW STAR EXIST OR NOT END*/
                    }
                }
                /* Review Enable End */
            };
            /* RESIZE EVENT START */
            var resizeWidget = function () {
                if ($(window).width() < 1024) {
                    if ($('.buy-me-variants-wrap label').is(':visible')) {
                        $('.buy-me-variants-wrap label').hide();
                        $('.buy-me-variants-wrap').each(function () {
                            var var_name = $(this).find('label').html();
                            if (!$(this).find('select').children('option:first-child').is(':disabled')) {
                                $(this).find('select').prepend('<option value=\'\' disabled>' + var_name + '</option>');
                            }
                        });
                    }
                } else {
                    if (!$('.buy-me-variants-wrap label').is(':visible')) {
                        $('.buy-me-variants-wrap label').css('display', 'inline-block');
                        $('.buy-me-variants-wrap').each(function () {
                            var var_name = $(this).find('label').html();
                            if ($(this).find('select').children('option:first-child').is(':disabled')) {
                                $(this).find('select').children('option:first-child').remove();
                            }
                        });
                    }
                }
                if ($(window).width() <= 768) {
                    var variantContainer = $('#buy-me .buy-me-additional').find('.buy-me-variants').clone();
                    $('#buy-me .buy-me-additional').find('.buy-me-variants').remove();
                    $(variantContainer).insertAfter('#buy-me .buy-me-additional');
                    if ($('.buy-me-variants').find('select').length > 0) {
                        if (!$('.buy-me-variants').hasClass('adjust')) $('.buy-me-variants').addClass('adjust');
                        $('.buy-me-variants').find('select').addClass('w100per');
                        if ($('.buy-me-variants').find('select').length == 1) $('.buy-me-variants').find('.buy-me-variants-wrap').addClass('w100per'); else if ($('.buy-me-variants').find('select').length == 2) $('.buy-me-variants').find('.buy-me-variants-wrap').addClass('w50per'); else if ($('.buy-me-variants').find('select').length == 3) $('.buy-me-variants').find('.buy-me-variants-wrap').addClass('w33_33per');
                    }
                } else {
                    if ($('#buy-me').find('.buy-me-variants.adjust').index() > -1) {
                        var variantContainer = $('#buy-me').find('.buy-me-variants.adjust').clone();
                        $('#buy-me').find('.buy-me-variants.adjust').remove();
                        $(variantContainer).insertAfter('#buy-me .buy-me-additional');
                        $('#buy-me .buy-me-additional').append(variantContainer);
                        $('#buy-me .buy-me-additional').find('.buy-me-variants').removeClass('adjust');
                        if ($('.buy-me-variants').find('select').length > 0) {
                            if ($('.buy-me-variants').hasClass('adjust')) $('.buy-me-variants').removeClass('adjust');
                            $('.buy-me-variants').find('select').removeClass('w100per');
                            if ($('.buy-me-variants').find('select').length == 1) $('.buy-me-variants').find('.buy-me-variants-wrap').removeClass('w100per'); else if ($('.buy-me-variants').find('select').length == 2) $('.buy-me-variants').find('.buy-me-variants-wrap').removeClass('w50per'); else if ($('.buy-me-variants').find('select').length == 3) $('.buy-me-variants').find('.buy-me-variants-wrap').removeClass('w33_33per');
                        }
                    }
                }
                if ($(window).width() < 468) {
                    if (isMobileBuyButtonFull == '1') {
                        if (isQuantityEnableMobile == '1') {
                            $('#buy-me').find('.buy-me-quantity').addClass('adjust');
                            var padding_top = 0, padding_bottom = 0, padding = 0, border_top = 0, border_bottom = 0,
                                border = 0,
                                actual_assign_height = $('#buy-me').find('#buy-me-add-to-cart-div').height();
                            /* try { padding_top = parseFloat($('#buy-me').find('#buy-me-quantity').css('padding-top')); padding_bottom = parseFloat($('#buy-me').find('#buy-me-quantity').css('padding-bottom')); padding = padding_top + padding_bottom; } catch(e) { } */
                            try {
                                border_top = parseFloat($('#buy-me').find('#buy-me-quantity').css('border-top'));
                                border_bottom = parseFloat($('#buy-me').find('#buy-me-quantity').css('border-bottom'));
                                border = border_top + border_bottom;
                            } catch (e) {
                            }
                            actual_assign_height = actual_assign_height - (padding + border);
                            $('#buy-me').find('#buy-me-quantity').css('height', actual_assign_height);
                            $('#buy-me').find('#buy-me-add-to-cart-div').addClass('adjust');
                            $('#buy-me').find('.buy-me-additional').addClass('adjust');
                            $('#buy-me').find('.buy-me-additional').removeAttr('style');
                        }
                    }
                } else {
                    if (isMobileBuyButtonFull == '1') {
                        if (isQuantityEnableMobile == '1') {
                            $('#buy-me').find('.buy-me-quantity').removeClass('adjust');
                            $('#buy-me').find('#buy-me-quantity').removeAttr('style');
                            $('#buy-me').find('#buy-me-add-to-cart-div').removeClass('adjust');
                            $('#buy-me').find('.buy-me-additional').removeClass('adjust');
                        }
                    }
                }
                var buy_me = $('#buy-me').width(), buy_me_thumb_img = $('.buy-me-thumb-img').width(),
                    buy_me_title = $('.buy-me-title').width(), buy_me_additional = $('.buy-me-additional').width(),
                    actual_containers_width = buy_me_thumb_img + buy_me_additional, maintain_gap = 10;
                if (buy_me_title <= 0) $('.buy-me-title').removeAttr('style');
                buy_me_title = buy_me - actual_containers_width - maintain_gap;
                if (isInstantLoad == '1' && buy_me_title <= 0) {
                    buy_me_title = $('.buy-me-title').width() / 3;
                }
                $('.buy-me-title').css('width', parseFloat(buy_me_title));
                if (!$('#buy-me').find('.buy-me-variants-wrap select:first').hasClass('bg-adjust')) {
                    if ($('#buy-me').find('.buy-me-variants-wrap select:first').css('background-image') != '') {
                        $('#buy-me').find('.buy-me-variants-wrap select').addClass('bg-adjust');
                    }
                }
            };
            var resizeTimeOut = 0;
            $(window).resize(function () {
                clearTimeout(resizeTimeOut);
                resizeTimeOut = setTimeout(function () {
                    resizeWidget();
                }, 1000);
            });
            /* RESIZE EVENT END */
            var timerNumber = 0;
            $(window).scroll(function () {
                if (timerNumber == 0) {
                    var height = $(window).height();
                    var displayHeight = height / 2;
                    var btn_position = 0;
                    try {
                        btn_position = getAddToCartBtnObj().offset().top;
                        changeBuyButton();
                    } catch (e) {
                    }
                    try {
                        setSelectFromVariantID();
                    } catch (e) {
                    }
                    if (false) {
                        if ($('#buy-me-add-to-cart-div').find('input[type=submit]').index() > -1) $('#buy-me-add-to-cart-div').find('input[type=submit]').val(''); else if ($('#buy-me-add-to-cart-div').find('button[type=submit]').index() > -1) $('#buy-me-add-to-cart-div').find('button[type=submit]').html('');
                    }
                    getRatings();
                    if (false) getQtyBox();
                    displayHeight = btn_position;
                    /*if(btn_position > 0 && btn_position < height) displayHeight = btn_position; else if(320 < height) displayHeight = 320;*/
                    var actualScrollPossition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                    /*INSTANT LOAD START*/
                    if (isInstantLoad == '1') {
                        $('#buy-me').addClass('active');
                        $('#buy-me').addClass('instant-load-me');
                        resizeWidget();
                    } else {
                        if (!$('#buy-me').hasClass('force-from-switch')) {
                            if (actualScrollPossition >= displayHeight) {
                                $('#buy-me').show();
                                if (!$('#buy-me').hasClass('active')) {
                                    timerNumber = setTimeout(function () {
                                        $('#buy-me').addClass('active');
                                        resizeWidget();
                                        timerNumber = 0;
                                    }, 50);
                                }
                            } else {
                                if ($('#buy-me').hasClass('active')) {
                                    $('#buy-me').removeClass('active');
                                    timerNumber = setTimeout(function () {
                                        $('#buy-me').hide();
                                        timerNumber = 0;
                                    }, 1000);
                                }
                            }
                        }
                    }
                    /*INSTANT LOAD END*/
                    /* RESIZE TRIGGER FORCE TO ADJUST BAR START */
                    $(window).resize();
                    /* RESIZE TRIGGER FORCE TO ADJUST BAR END */
                }
            });
            var changePriceBasedOnVariantSelection = function (thisObj) {
                if (wholeProductDetails !== undefined) {
                    if (typeof thisObj === 'string' || thisObj instanceof String) {
                        setPOPUPValues(wholeProductDetails, thisObj);
                    } else {
                        var isNotFromVariantSelector = true;
                        if (false) {
                            if (false) {
                                setPOPUPValues(wholeProductDetails, $('').closest('form').find('[name="id"]').val());
                                isNotFromVariantSelector = false;
                            }
                        }
                        if (isNotFromVariantSelector) {
                            if (false) {
                                setPOPUPValues(wholeProductDetails, $('').closest('form').find('[name="id"]').val());
                            } else {
                                if (thisObj.closest('form').find('[name=\'id\']').index() > -1) {
                                    if (thisObj.closest('form').find('[name=\'id\']').val() != null) setPOPUPValues(wholeProductDetails, thisObj.closest('form').find('[name=\'id\']').val()); else if (window.location.href.toLowerCase().indexOf('variant') > -1) {
                                        setPOPUPValues(wholeProductDetails, getUrlParameter('variant'));
                                    } else setPOPUPValues(wholeProductDetails);
                                } else if (window.location.href.toLowerCase().indexOf('variant') > -1) setPOPUPValues(wholeProductDetails, getUrlParameter('variant')); else setPOPUPValues(wholeProductDetails);
                            }
                        }
                    }
                    resizeWidget();
                }
            };
            if (false) {
                if (false) {
                    $(' input[type=radio]').change(function () {
                        changePriceBasedOnVariantSelection($(this));
                    });
                }
            } else if (false) {
                $(' select').change(function () {
                    changePriceBasedOnVariantSelection($(this));
                    getVariants($(this));
                });
            } else {
                $('form[action=\'/cart/add\']:first').on('change', '.single-option-selector', function () {
                    changePriceBasedOnVariantSelection($(this));
                    getVariants($(this));
                });
            }
            if (false) {
                if (false) {
                    $('#buy-me').on('change', 'select', function () {
                        var selectVal = $(this).val();
                        var currentTop = $(window).scrollTop();
                        $('#buy-me').addClass('force-from-switch');
                        if ($(this).prop('id') == '') {
                            $('input[value="' + selectVal + '"]').next('label').trigger('click');
                        } else {
                            $('#' + $(this).prop('id')).find('input[value="' + selectVal + '"]').next('label').trigger('click');
                        }
                        $('body').animate({scrollTop: currentTop}, 0);
                        $('#buy-me').removeClass('force-from-switch');
                    });
                }
            } else if (false) {
                $('#buy-me').on('change', 'select', function () {
                    if ($('').find('#' + $(this).prop('id')).index() > -1) {
                        $('').find('#' + $(this).prop('id') + ' option[value="' + this.value + '"]').prop('selected', true);
                        $('').find('#' + $(this).prop('id')).trigger('change');
                    }
                });
            } else {
                if ($('form[action=\'/cart/add\']:first').find('[id^=productSelect]').length > 0) {
                    $('#buy-me').on('change', '[id^=productSelect]', function () {
                        if ($('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id')).index() > -1) {
                            $('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id') + ' option[value="' + this.value + '"]').prop('selected', true);
                            $('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id')).trigger('change');
                        }
                    });
                } else if ($('form[action=\'/cart/add\']:first').find('[data-option^=option]').length > 0) {
                    $('#buy-me').on('change', '[data-option^=option]', function () {
                        if ($('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id')).index() > -1) {
                            $('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id') + ' option[value="' + this.value + '"]').prop('selected', true);
                            $('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id')).trigger('change');
                        }
                    });
                } else if ($('form[action=\'/cart/add\']:first').find('.single-option-selector').length > 0) {
                    $('#buy-me').on('change', '.single-option-selector', function () {
                        if ($('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id')).index() > -1) {
                            if ($('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id') + ' option[value="' + this.value + '"]').index() > -1) $('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id') + ' option[value="' + this.value + '"]').prop('selected', true); else {
                                $('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id')).val(this.value);
                            }
                            $('form[action=\'/cart/add\']:first').find('#' + $(this).prop('id')).trigger('change');
                        }
                    });
                }
            }
            /* Variant Logic Start */
            var setSelectFromVariantID = function () {
                if (0 || 0) {
                    if (wholeProductDetails !== undefined) {
                        var variantID = getUrlParameter('variant');
                        var variants = wholeProductDetails.product.variants;
                        for (var i = 0; i < variants.length; i++) {
                            if (variants[i].id == variantID) {
                                try {
                                    if (variants[i].option1 != null) {
                                        $('#buy-me .buy-me-variants').find('select option[value="' + variants[i].option1 + '"]').closest('select').val(variants[i].option1);
                                    }
                                    if (variants[i].option2 != null) {
                                        $('#buy-me .buy-me-variants').find('select option[value="' + variants[i].option2 + '"]').closest('select').val(variants[i].option2);
                                    }
                                    if (variants[i].option3 != null) {
                                        $('#buy-me .buy-me-variants').find('select option[value="' + variants[i].option3 + '"]').closest('select').val(variants[i].option3);
                                    }
                                } catch (e) {
                                }
                                break;
                            }
                        }
                    }
                }
            };
            var getVariants = function (obj) {
                if (0 || 0) {
                    if (false) {
                        if (false) {
                            var variantSelector = '';
                            var selector = '<select id=\'##ID##\'>##OPTIONS##</select>';
                            var option = '<option value=\'##VALUE##\'>##TEXT##</option>';
                            var selectHTML = '';
                            $(variantSelector).each(function () {
                                var selectBox = selector;
                                selectBox = selectBox.replace('##ID##', $(this).prop('id'));
                                var optionHTML = '';
                                $(this).find('input[type=radio]').each(function () {
                                    var optionBox = option;
                                    optionBox = optionBox.replace('##VALUE##', $(this).val()).replace('##TEXT##', $(this).val());
                                    optionHTML += optionBox;
                                });
                                selectBox = selectBox.replace('##OPTIONS##', optionHTML);
                                selectHTML += selectBox;
                            });
                            $('#buy-me .buy-me-variants').html(selectHTML);
                        }
                    } else if (false) {
                        if (typeof obj !== 'undefined') $('#buy-me .buy-me-variants').find('#' + obj.prop('id')).val(obj.val()); else {
                            if ($('').find('select').find('option[value="Default Title"]').index() == -1) $('#buy-me .buy-me-variants').html($('').find('select').not('[name=\'id\']').clone());
                        }
                    } else {
                        if ($('form[action=\'/cart/add\']:first').find('[id^=productSelect]').length > 0) {
                            if (typeof obj !== 'undefined') $('#buy-me .buy-me-variants').find('#' + obj.prop('id')).val(obj.val()); else {
                                if ($('form[action=\'/cart/add\']:first').find('[id^=productSelect]').find('option[value="Default Title"]').index() == -1) {
                                    $('#buy-me .buy-me-variants').html($('form[action=\'/cart/add\']:first').find('[id^=productSelect]').not('[name=\'id\']').clone());
                                }
                            }
                        } else if ($('form[action=\'/cart/add\']:first').find('[data-option^=option]').length > 0) {
                            if (typeof obj !== 'undefined') $('#buy-me .buy-me-variants').find('#' + obj.prop('id')).val(obj.val()); else {
                                if ($('form[action=\'/cart/add\']:first').find('[data-option^=option]').find('option[value="Default Title"]').index() == -1) {
                                    $('#buy-me .buy-me-variants').html($('form[action=\'/cart/add\']:first').find('[data-option^=option]').not('[name=\'id\']').clone());
                                }
                            }
                        } else if ($('form[action=\'/cart/add\']:first').find('.selector-wrapper select').length > 0) {
                            if (typeof obj !== 'undefined') $('#buy-me .buy-me-variants').find('#' + obj.prop('id')).val(obj.val()); else {
                                if ($('form[action=\'/cart/add\']:first').find('.selector-wrapper select').find('option[value="Default Title"]').index() == -1) {
                                    $('#buy-me .buy-me-variants').html($('form[action=\'/cart/add\']:first').find('.selector-wrapper select').not('[name=\'id\']').clone());
                                }
                            }
                        }
                    }
                    if (typeof obj === 'undefined') {
                        var options = wholeProductDetails.product.options;
                        try {
                            $('#buy-me .buy-me-variants').find('select').each(function () {
                                if (options.length > 0) {
                                    $(this).wrap('<div class=\'buy-me-variants-wrap\'></div>');
                                    $(this).before('<label>' + options[0].name + '</label>');
                                    options.splice(0, 1);
                                }
                            });
                        } catch (e) {
                        }
                    }
                    /* NEED TO CHAGE START */
                    /* if(typeof obj === 'undefined') { if($('#buy-me .buy-me-additional').find('.buy-me-variants select').length == 3 && $(window).width() < 1684) { var variantContainer = $('#buy-me .buy-me-additional').find('.buy-me-variants').clone(); $('#buy-me').find('.buy-me-variants').remove(); $(variantContainer).insertAfter('#buy-me .buy-me-additional'); $('#buy-me').find('.buy-me-variants').addClass('adjust'); } else if($('#buy-me .buy-me-additional').find('.buy-me-variants select').length == 2 && $(window).width() < 1520) { var variantContainer = $('#buy-me .buy-me-additional').find('.buy-me-variants').clone(); $('#buy-me').find('.buy-me-variants').remove(); $(variantContainer).insertAfter('#buy-me .buy-me-additional'); $('#buy-me').find('.buy-me-variants').addClass('adjust'); } else if($('#buy-me .buy-me-additional').find('.buy-me-variants select').length == 1 && $(window).width() < 1352) { var variantContainer = $('#buy-me .buy-me-additional').find('.buy-me-variants').clone(); $('#buy-me').find('.buy-me-variants').remove(); $(variantContainer).insertAfter('#buy-me .buy-me-additional'); $('#buy-me').find('.buy-me-variants').addClass('adjust'); } else if($(window).width() < 768) { var variantContainer = $('#buy-me .buy-me-additional').find('.buy-me-variants').clone(); $('#buy-me').find('.buy-me-variants').remove(); $(variantContainer).insertAfter('#buy-me .buy-me-additional'); } } if($('.buy-me-variants.adjust').find('select').length > 0) { if($('.buy-me-variants.adjust').find('select').length == 1) $('.buy-me-variants.adjust').find('select').addClass('w100per'); else if($('.buy-me-variants.adjust').find('select').length == 2) $('.buy-me-variants.adjust').find('select').addClass('w50per'); else if($('.buy-me-variants.adjust').find('select').length == 3) $('.buy-me-variants.adjust').find('select').addClass('w33_33per'); } */
                    /* NEED TO CHAGE END */
                }
            };
            /* Variant Logic End */
            var getAddToCartBtnObj = function () {
                var btnObj;
                var isNotFound = true;
                if (false) {
                    if ($('').length > 0) {
                        btnObj = $('');
                    } else {
                        if ($('form[action=\'/cart/add\']:first').find('[type=\'submit\']').index() > -1) {
                            if ($('form[action=\'/cart/add\']:first').find('[type=\'submit\']').is(':visible')) btnObj = $('form[action=\'/cart/add\']:first').find('[type=\'submit\']'); else btnObj = $('form[action=\'/cart/add\']:first').find('[type=\'button\']');
                        } else if ($('form[action=\'/cart/add\']:first').find('button[name=\'add\']').index() > -1) btnObj = $('form[action=\'/cart/add\']:first').find('button[name=\'add\']'); else btnObj = $('form[action=\'/cart/add\']:first').find('[type=\'submit\']');
                    }
                } else {
                    if ($('form[action=\'/cart/add\']:first').find('[type=\'submit\']').index() > -1) {
                        if ($('form[action=\'/cart/add\']:first').find('[type=\'submit\']').is(':visible')) btnObj = $('form[action=\'/cart/add\']:first').find('[type=\'submit\']'); else btnObj = $('form[action=\'/cart/add\']:first').find('[type=\'button\']');
                    } else if ($('form[action=\'/cart/add\']:first').find('button[name=\'add\']').index() > -1) btnObj = $('form[action=\'/cart/add\']:first').find('button[name=\'add\']'); else btnObj = $('form[action=\'/cart/add\']:first').find('[type=\'submit\']');
                }
                return btnObj;
            };
            /* Get Parameter from URL Start */
            var getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'), sParameterName, i;
                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            };
            /* Get Parameter from URL End */
            var productImage = '';
            var productTitle = '';
            var productRatings = '';
            var productPrice = '';
            var compareAtPrice = '';
            var productVariantTitle = '';
            var productPriceFormat = '${{amount}}';
            var wholeProductDetails;
            var setPOPUPValues = function (data, variantID) {
                productImage = data.product['image']['src'];
                productTitle = data.product['title'];
                if (typeof variantID === 'undefined' || variantID == '') {
                    productPrice = data.product['variants'][0]['price'];
                    compareAtPrice = data.product['variants'][0]['compare_at_price'];
                    variantID = '';
                } else {
                    for (var i = 0; i < data.product.variants.length; i++) {
                        if (data.product.variants[i].id == variantID) {
                            productPrice = data.product.variants[i]['price'];
                            compareAtPrice = data.product.variants[i]['compare_at_price'];
                            productVariantTitle = ' - ' + data.product.variants[i]['title'];
                            if (data.product.variants[i]['image_id']) {
                                for (var j = 0; j < data.product.images.length; j++) {
                                    if (data.product.variants[i]['image_id'] == data.product.images[j]['id']) {
                                        productImage = data.product.images[j]['src'];
                                    }
                                }
                            }
                        }
                    }
                }
                if (getAddToCartBtnObj().index() == -1) {
                    if (variantID != '') {
                        for (var i = 0; i < data.product.variants.length; i++) {
                            if (data.product.variants[i].id == variantID) {
                                if (data.product.variants[i].inventory_quantity <= 0 && data.product.variants[i].inventory_policy == 'deny' && data.product.variants[i].inventory_management == 'shopify') {
                                    $('#buy-me-add-to-cart-btn').html('Sold Out');
                                    $('#buy-me-add-to-cart-btn').attr('disabled', true);
                                    $('#buy-me-add-to-cart-div').addClass('buy-me-disabled');
                                } else {
                                    $('#buy-me-add-to-cart-btn').html('Add to Cart');
                                    $('#buy-me-add-to-cart-btn').removeAttr('disabled');
                                    $('#buy-me-add-to-cart-div').removeClass('buy-me-disabled');
                                }
                            }
                        }
                    } else if (data.product.variants.length > 0) {
                        if (data.product.variants[0].inventory_quantity <= 0 && data.product.variants[0].inventory_policy == 'deny' && data.product.variants[0].inventory_management == 'shopify') {
                            $('#buy-me-add-to-cart-btn').html('Sold Out');
                            $('#buy-me-add-to-cart-btn').attr('disabled', true);
                            $('#buy-me-add-to-cart-div').addClass('buy-me-disabled');
                        } else {
                            $('#buy-me-add-to-cart-btn').html('Add to Cart');
                            $('#buy-me-add-to-cart-btn').removeAttr('disabled');
                            $('#buy-me-add-to-cart-div').removeClass('buy-me-disabled');
                        }
                    }
                }
                var productImage = fn_setProductImage(productImage);
                var imgLoader = $('#buy-me').find('.buy-me-thumb').attr('src', productImage);
                imgLoader.on('load', function () {
                    if (isMobileBuyButtonFull == '0' || $(window).width() > 465) {
                        if ($('#buy-me .buy-me-thumb-img').height() > $('#buy-me .buy-me-title').height()) {
                            $('#buy-me .buy-me-additional').css('height', $('#buy-me .buy-me-thumb-img').height() + 'px');
                        } else {
                            $('#buy-me .buy-me-additional').css('height', $('#buy-me .buy-me-title').height() + 'px');
                        }
                    }
                });
                if (productVariantTitle == ' - Default Title') productVariantTitle = '';
                $('#buy-me').find('.buy-me-title-a').html(productTitle + productVariantTitle);
                $('#buy-me').find('.buy-me-price').html(productPriceFormat.replace('{{amount}}', productPrice).replace('{{amount_no_decimals}}', productPrice).replace('{{amount_with_comma_separator}}', productPrice).replace('.00', ''));
                $('#buy-me').find('.buy-me-price').attr('data-org_price', productPrice);
                /* Social Media Start */
                if (0) {
                    var ShareURL = 'https://doers-outdoors.myshopify.com/products/' + data.product['handle'];
                    $('#buy-me .buy-me-share.fac-link').attr('href', 'https://www.facebook.com/sharer.php?u=' + ShareURL);
                    $('#buy-me .buy-me-share.twi-link').attr('href', 'https://twitter.com/share?url=' + ShareURL);
                    $('#buy-me .buy-me-share.ggl-link').attr('href', 'https://plus.google.com/share?url=' + ShareURL);
                    $('#buy-me .buy-me-share.lki-link').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + ShareURL);
                    $('#buy-me .buy-me-share.ptt-link').attr('href', 'https://pinterest.com/pin/create/button/?url=' + ShareURL);
                    $('#buy-me .buy-me-share.tbl-link').attr('href', 'https://www.tumblr.com/share/link?url=' + ShareURL);
                    if ($(window).width() < 768) {
                        $('#buy-me .buy-me-share.whts-link').attr('data-text', data.product['title']);
                        $('#buy-me .buy-me-share.whts-link').attr('data-link', ShareURL);
                    }
                }
                /* Social Media End */
                if (compareAtPrice != null && compareAtPrice > 0 && parseFloat(compareAtPrice) > parseFloat(productPrice)) $('#buy-me').find('.buy-me-compare-price').html(productPriceFormat.replace('{{amount}}', compareAtPrice).replace('{{amount_no_decimals}}', compareAtPrice).replace('{{amount_with_comma_separator}}', compareAtPrice).replace('.00', '')); else $('#buy-me').find('.buy-me-compare-price').html('');
                /* Force to trigger scroll Start */
                $(window).scroll();
                /* Force to trigger scroll End */
            };
            var isAjaxLoading = false;
            /* Add to Cart button Start */
            $('body').on('click', '#buy-me-add-to-cart-div [type=\'submit\'], #buy-me-add-to-cart-div button[name=\'add\'], #buy-me-add-to-cart-div button[name=\'checkout\']', function () {
                isAjaxLoading = true;
                try {
                    var URL = window.location.href.split('/')[window.location.href.split('/').length - 1],
                        prod_price = 0;
                    URL = URL.split('?')[0];
                    try {
                        prod_price = parseFloat($('#buy-me .buy-me-price').attr('data-org_price'));
                    } catch (e) {
                        prod_price = 0;
                    }
                } catch (e) {
                }
                if (true) {
                    var RequestURL = '';
                    var VarId = '', Qty = 1;
                    if (false) {
                        if ($('').closest('form').find('[name=id]').index() > -1) {
                            VarId = $('').closest('form').find('[name=id]').val();
                        }
                        if ($('').closest('form').find('[name=quantity]').index() > -1) {
                            Qty = $('').closest('form').find('[name=quantity]').val();
                        }
                    } else {
                        if ($('form[action=\'/cart/add\']').find('[name=id]').index() > -1) {
                            VarId = $('form[action=\'/cart/add\']').find('[name=id]').val();
                            if ($('form[action=\'/cart/add\']').find('[name=quantity]').index() > -1) {
                                Qty = $('form[action=\'/cart/add\']').find('[name=quantity]').val();
                            }
                        } else {
                            VarId = getUrlParameter('variant');
                        }
                    }
                    if (VarId != '') window.location = '/cart/' + VarId + ':' + Qty;
                } else if (false) {
                    if ($('').hasClass('disabled')) $('#buy-me-add-to-cart-div [type=\'submit\']').attr('disabled', 'disabled'); else {
                        if (false) $('').click(); else $('').closest('form').submit();
                    }
                } else {
                    if ($('#buy-me-add-to-cart-div [type=\'submit\']').index() > -1) {
                        if ($('#buy-me-add-to-cart-div [type=\'submit\']').hasClass('disabled')) {
                            $('#buy-me-add-to-cart-div [type=\'submit\']').attr('disabled', 'disabled');
                        } else {
                            var isNotFound = true;
                            $('form[action=\'/cart/add\']').each(function () {
                                if (isNotFound) {
                                    if ($(this).find('select[name="id"]').index() > -1) {
                                        if (false) {
                                            if ($(this).find('input[type="submit"]').is(':visible')) $(this).find('input[type="submit"]:visible').first().click(); else if ($(this).find('button[type="submit"]').is(':visible')) {
                                                $(this).find('button[type="submit"]:visible').first().click();
                                            } else if ($(this).find('button:visible').is(':visible')) $(this).find('button:visible').first().click();
                                        } else $(this).submit();
                                        isNotFound = false;
                                    }
                                }
                            });
                            if (isNotFound) {
                                $('form[action=\'/cart/add\']').each(function () {
                                    if (isNotFound) {
                                        if ($(this).find('input[name="id"]').index() > -1) {
                                            if (false) {
                                                if ($(this).find('input[type="submit"]').is(':visible')) $(this).find('input[type="submit"]:visible').first().click(); else if ($(this).find('button[type="submit"]').is(':visible')) $(this).find('button[type="submit"]:visible').first().click(); else if ($(this).find('button').is(':visible')) $(this).find('button:visible').first().click();
                                            } else $(this).submit();
                                            isNotFound = false;
                                        }
                                    }
                                });
                                if (isNotFound) {
                                    $('form[action=\'/cart\']').each(function () {
                                        if (isNotFound) {
                                            if ($(this).find('select[name="id"]').index() > -1 || $(this).find('input[name="id"]').index() > -1) {
                                                if ($(this).find('[type=button]').index() > -1) {
                                                    $(this).find('[type=button]').click();
                                                    isNotFound = false;
                                                } else if ($(this).find('[type=submit]').index() > -1) {
                                                    $(this).find('[type=submit]').click();
                                                    isNotFound = false;
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    } else if ($('#buy-me-add-to-cart-div button[name=\'add\']').index() > -1) {
                        if ($('#buy-me-add-to-cart-div button[name=\'add\']').hasClass('disabled')) $('#buy-me-add-to-cart-div button[name=\'add\']').attr('disabled', 'disabled'); else {
                            var isNotFound = true;
                            $('form[action=\'/cart/add\']').each(function () {
                                if (isNotFound) {
                                    if ($(this).find('select[name="id"]').index() > -1) {
                                        if (false) {
                                            if ($(this).find('input[type="submit"]').is(':visible')) $(this).find('input[type="submit"]:visible').first().click(); else if ($(this).find('button[type="submit"]').is(':visible')) $(this).find('button[type="submit"]:visible').first().click(); else if ($(this).find('button').is(':visible')) $(this).find('button:visible').first().click();
                                        } else $(this).submit();
                                        isNotFound = false;
                                    }
                                }
                            });
                            if (isNotFound) {
                                $('form[action=\'/cart/add\']').each(function () {
                                    if (isNotFound) {
                                        if ($(this).find('input[name="id"]').index() > -1) {
                                            if (false) {
                                                if ($(this).find('input[type="submit"]').is(':visible')) $(this).find('input[type="submit"]:visible').first().click(); else if ($(this).find('button[type="submit"]').is(':visible')) $(this).find('button[type="submit"]:visible').first().click(); else if ($(this).find('button').is(':visible')) $(this).find('button:visible').first().click();
                                            } else $(this).submit();
                                            isNotFound = false;
                                        }
                                    }
                                });
                            }
                        }
                    } else {
                        var isNotFound = true;
                        $('form[action=\'/cart/add\']').each(function () {
                            if (isNotFound) {
                                if ($(this).find('select[name="id"]').index() > -1) {
                                    if (false) {
                                        if ($(this).find('input[type="submit"]').is(':visible')) $(this).find('input[type="submit"]:visible').first().click(); else if ($(this).find('button[type="submit"]').is(':visible')) $(this).find('button[type="submit"]:visible').first().click(); else if ($(this).find('button').is(':visible')) $(this).find('button:visible').first().click();
                                    } else $(this).submit();
                                    isNotFound = false;
                                }
                            }
                        });
                        if (isNotFound) {
                            $('form[action=\'/cart/add\']').each(function () {
                                if (isNotFound) {
                                    if ($(this).find('input[name="id"]').index() > -1) {
                                        if (false) {
                                            if ($(this).find('input[type="submit"]').is(':visible')) $(this).find('input[type="submit"]:visible').first().click(); else if ($(this).find('button[type="submit"]').is(':visible')) $(this).find('button[type="submit"]:visible').first().click(); else if ($(this).find('button').is(':visible')) $(this).find('button:visible').first().click();
                                        } else $(this).submit();
                                        isNotFound = false;
                                    }
                                }
                            });
                        }
                    }
                }
            });
            /* Add to Cart button End */
            /* Loader For Add To Cart Button Start */
            var buyMeTimer = 0, fallBackTimer = 0;
            $(document).ajaxStart(function () {
                if (isAjaxLoading) {
                    buyMeTimer = setInterval(function () {
                        if (getAddToCartBtnObj().index() > -1) $('#buy-me-add-to-cart-div').html(getAddToCartBtnObj().clone());
                    }, 10);
                    fallBackTimer = setTimeout(function () {
                        isAjaxLoading = false;
                        clearInterval(buyMeTimer);
                        setTimeout(function () {
                            if (getAddToCartBtnObj().index() > -1) $('#buy-me-add-to-cart-div').html(getAddToCartBtnObj().clone());
                        }, 1000);
                    }, 5000);
                }
            }).ajaxStop(function () {
                if (isAjaxLoading) {
                    isAjaxLoading = false;
                    clearInterval(buyMeTimer);
                    clearTimeout(fallBackTimer);
                    setTimeout(function () {
                        if (getAddToCartBtnObj().index() > -1) $('#buy-me-add-to-cart-div').html(getAddToCartBtnObj().clone());
                        if (false) {
                            if ($('#buy-me-add-to-cart-div').find('input[type=submit]').index() > -1) $('#buy-me-add-to-cart-div').find('input[type=submit]').val(''); else if ($('#buy-me-add-to-cart-div').find('button[type=submit]').index() > -1) $('#buy-me-add-to-cart-div').find('button[type=submit]').html('');
                        }
                    }, 1000);
                }
            });
            /* Loader For Add To Cart Button End */
            /* GET CURRENT PRODUCT DETAIL */
            /* setPOPUPValues Start */
            var buildPOPUP = function (wholeProductDetails) { /* Get variants from shop */
                getVariants();
                if (false) {
                    if (false) {
                        setPOPUPValues(wholeProductDetails, $('').closest('form').find('[name="id"]').val());
                    }
                } else if (false) {
                    setPOPUPValues(wholeProductDetails, $('').closest('form').find('[name="id"]').val());
                } else {
                    if ($('form[action=\'/cart/add\']:first').find('[name=\'id\']').index() > -1) {
                        if ($('form[action=\'/cart/add\']:first').find('[name=\'id\']').val() != null) setPOPUPValues(wholeProductDetails, $('form[action=\'/cart/add\']:first').find('[name=\'id\']').val()); else if (window.location.href.toLowerCase().indexOf('variant') > -1) setPOPUPValues(wholeProductDetails, getUrlParameter('variant')); else setPOPUPValues(wholeProductDetails);
                    } else if (window.location.href.toLowerCase().indexOf('variant') > -1) setPOPUPValues(wholeProductDetails, getUrlParameter('variant')); else setPOPUPValues(wholeProductDetails);
                }
            };
            /* setPOPUPValues End */
            var wholeProductDetails = [];
            if (typeof window.bm_product != 'undefined') {
                if (window.bm_product.length == 0) {
                    $.getJSON(productUrl, function (data) {
                        wholeProductDetails = data;
                        buildPOPUP(wholeProductDetails);
                        /* RESIZE TRIGGER FORCE TO ADJUST BAR START */
                        $(window).resize();
                        /* RESIZE TRIGGER FORCE TO ADJUST BAR END */
                    });
                } else { /*CONVERT RESPONSE TO READABLE FORMAT START*/
                    var DynaProdInfo = [];
                    var FirstProductStep = [];
                    FirstProductStep['handle'] = window.bm_product.handle;
                    FirstProductStep['id'] = window.bm_product.id;
                    var TempImagesrcArr = [];
                    TempImagesrcArr['src'] = window.bm_product.featured_image;
                    FirstProductStep['image'] = TempImagesrcArr;
                    var TempProdImagesArray = [];
                    for (i = 0; i < window.bm_product.variants.length; i++) {
                        var InnerArray = [];
                        if (window.bm_product.variants[i].featured_image !== null) {
                            InnerArray['id'] = window.bm_product.variants[i].featured_image.id;
                            InnerArray['src'] = window.bm_product.variants[i].featured_image.src;
                        } else {
                            InnerArray['id'] = 0;
                            InnerArray['src'] = window.bm_product.featured_image;
                        }
                        TempProdImagesArray[i] = InnerArray;
                    }
                    FirstProductStep['images'] = TempProdImagesArray;
                    FirstProductStep['options'] = window.bm_product.options;
                    FirstProductStep['title'] = window.bm_product.title;
                    var TempProdVariantsArray = [];
                    for (i = 0; i < window.bm_product.variants.length; i++) {
                        var InnerArray = [];
                        InnerArray['compare_at_price'] = (parseFloat(window.bm_product.variants[i].compare_at_price) / 100);
                        InnerArray['id'] = window.bm_product.variants[i].id;
                        if (window.bm_product.variants[i].featured_image !== null) {
                            InnerArray['image_id'] = window.bm_product.variants[i].featured_image.id;
                        } else {
                            InnerArray['image_id'] = 0;
                        }
                        InnerArray['inventory_management'] = window.bm_product.variants[i].inventory_management;
                        InnerArray['inventory_policy'] = window.bm_product.variants[i].inventory_policy;
                        InnerArray['inventory_quantity'] = window.bm_product.variants[i].inventory_quantity;
                        InnerArray['option1'] = window.bm_product.variants[i].option1;
                        InnerArray['option2'] = window.bm_product.variants[i].option2;
                        InnerArray['option3'] = window.bm_product.variants[i].option3;
                        InnerArray['price'] = (parseFloat(window.bm_product.variants[i].price) / 100);
                        InnerArray['product_id'] = window.bm_product.id;
                        InnerArray['title'] = window.bm_product.variants[i].title;
                        TempProdVariantsArray[i] = InnerArray;
                    }
                    FirstProductStep['variants'] = TempProdVariantsArray;
                    FirstProductStep['vendor'] = window.bm_product.vendor;
                    DynaProdInfo['product'] = FirstProductStep;
                    /*CONVERT RESPONSE TO READABLE FORMAT END*/
                    wholeProductDetails = DynaProdInfo;
                    buildPOPUP(wholeProductDetails);
                    /* RESIZE TRIGGER FORCE TO ADJUST BAR START */
                    $(window).resize();
                    /* RESIZE TRIGGER FORCE TO ADJUST BAR END */
                }
            } else {
                $.getJSON(productUrl, function (data) {
                    wholeProductDetails = data;
                    buildPOPUP(wholeProductDetails);
                    /* RESIZE TRIGGER FORCE TO ADJUST BAR START */
                    $(window).resize();
                    /* RESIZE TRIGGER FORCE TO ADJUST BAR END */
                });
            }
            $('body').on('click', '.buy-me-scroll-top', function () {
                var speed = 600;
                $('html,body').animate({scrollTop: $('body').offset().top}, speed);
            });
            /* WhatsApp Sharing Code Start */
            var isMobile = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                }, BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                }, iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                }, Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                }, Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                }, any: function () {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };
            $('.buy-me-mobile').on('click', '.whts-link', function () {
                if (isMobile.any()) {
                    var text = $(this).attr('data-text');
                    var url = $(this).attr('data-link');
                    var message = encodeURIComponent(text) + ' - ' + encodeURIComponent(url);
                    var whatsapp_url = 'whatsapp://send?text=' + message;
                    window.location.href = whatsapp_url;
                }
            });
            /* WhatsApp Sharing Code End */
            /*SET INTERVAL FOR 2 SECONDS AND ADD-REMOVE CLASS START*/
            setInterval(function () {
                if ($('#buy-me-add-to-cart-div').find('.paush-animation').index() > -1) {
                    $('#buy-me-add-to-cart-div').find('button').removeClass('paush-animation');
                    $('#buy-me-add-to-cart-div').find('input').removeClass('paush-animation');
                } else {
                    $('#buy-me-add-to-cart-div').find('button').addClass('paush-animation');
                    $('#buy-me-add-to-cart-div').find('input').addClass('paush-animation');
                }
            }, 2000);
            /*SET INTERVAL FOR 2 SECONDS AND ADD-REOVE CLASS END*/
        } else {
            $('#buy-me').remove();
            return false;
        }
        $(".buy-me-share").click(function () { /* Analytics for Social Button Start */
            var t = Math.round(+new Date() / 1000);
            var data = "?method=social-analytics&id=" + $(this).data("id") + "&shop=doers-outdoors.myshopify.com&t=" + t;
            $.get("https://buy-me.makeprosimp.com/app/analytics" + data, function () {
            });
            /* Analytics for Social Button End */
        });
    };
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.3/js.cookie.min.js", function () {
        myAppJavaScript(jQuery);
    });
})();