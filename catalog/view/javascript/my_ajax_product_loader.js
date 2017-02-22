var container = '';
var page = 1;
var wh = 0;
var load = false;
var ct = 0;
var pages = [];

function my_getNextPage() {
    if (load)
        return;
    if (page > pages.length)
        return;
    
    page++;
    load = true;

    w = parseFloat($(container).css('width'));

    $.ajax({
        url: pages[page - 2],
        type: "GET",
        data: '',
        success: function (data) {
            $data = $(data);
            $('#ajaxblock').remove();
            if ($data) {
                if ($data.find('.product-list').length > 0) {
                    $items = $data.find('.product-list');
                    for ($i = 0; $i < $items.length; $i++) 
                        $(container).append($items[$i].outerHTML);
                } else if ($data.find('.product-grid').length > 0) {
                    $items = $data.find('.product-grid');
                    for ($i = 0; $i < $items.length; $i++) 
                        $(container).append($items[$i].outerHTML);
                }
                if ($items.length < $('#input-limit option:selected').text())
                    $('.products-ajax-button').remove();
            }
            load = false;
        }
    });
}

function my_getContainer() {
    if ($('.product-list').length > 0) {
        container = '.products-ajax';
    } else if ($('.product-grid').length > 0) {
        container = '.products-ajax';
    }
    return container;
}

function my_read_more_ajax() {
    container = my_getContainer();
    ch = $(container).height();
    scroll_t = $(this).scrollTop();
    if (ct + ch - wh < (scroll_t + 50)) {
        my_getNextPage();
    }
    return false;
}

$(document).ready(function () {
    wh = $(window).height();
    container = my_getContainer();
    
    if ($('.product-grid').length > 0 && $('.product-grid').length == $('#input-limit option:selected').text()) {
        $('.products-ajax-button').append('<div id="ajaxblock2" style="width:200px;height:30px;margin-top:20px;text-align:center;border:none !important;"><a href="#" style="height:50px;width:150px;color:white;background-color:blue;border-radius:5px;" class="button-ajax-prod" onclick="my_read_more_ajax();">Загрузить ещё</a></div>');
    } else if ($('.product-list').length > 0 && $('.product-list').length == $('#input-limit option:selected').text()) {
        $('.products-ajax-button').append('<div id="ajaxblock2" style="width:200px;height:30px;margin-top:20px;text-align:center;border:none !important;"><a href="#" style="height:50px;width:150px;color:white;background-color:blue;border-radius:5px;" class="button-ajax-prod" onclick="my_read_more_ajax();">Загрузить ещё</a></div>');
    }
    
    if ($(container).length > 0) {
        ct = parseFloat($(container).offset().top);
        
        $('.pagination a').each(function () {
            href = $(this).attr('href');
            if (jQuery.inArray(href, pages) == -1)
                pages.push(href);
        });
        
        $('.pagination').hide();
        
        if (pages.length == 0)
            $('.products-ajax-button').remove();
        
        $('.button-ajax-prod').click(function () {
            return false;
        });
    }
});