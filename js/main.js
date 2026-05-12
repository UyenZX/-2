/**
 * Cấu hình danh sách ảnh cho Flipbook
 */
var imageSources = [
    "pages/page-0001.jpg",
    "pages/page-0002.jpg",
    "pages/page-0003.jpg",
    "pages/page-0004.jpg",
    "pages/page-0005.jpg",
    "pages/page-0006.jpg",
    "pages/page-0007.jpg",
    "pages/page-0008.jpg",
    "pages/page-0009.jpg",
    "pages/page-0010.jpg",
    "pages/page-0011.jpg",
    "pages/page-0012.jpg",
    "pages/page-0013.jpg"
];

function loadApp() {
    var flipbook = $('#flipbook');
    var windowWidth = $(window).width();

    // Thiết lập kích thước
    var fbWidth = (windowWidth < 700) ? windowWidth * 0.9 : 900;
    var fbHeight = (windowWidth < 700) ? (fbWidth * 1.4) : 550;

    // Đổ ảnh vào container
    $.each(imageSources, function(index, src) {
        var page = $('<div />').append($('<img />', { src: src }));
        flipbook.append(page);
    });

    // Khởi tạo Turn.js
    flipbook.turn({
        width: fbWidth,
        height: fbHeight,
        elevation: 100,
        gradients: true,
        autoCenter: true,
        acceleration: true,
        display: (windowWidth < 700) ? 'single' : 'double',
        when: {
            turned: function(e, page) {
                $('#page-number').text(page + " / " + flipbook.turn('pages'));
                Hash.go('page/' + page).update();
            }
        }
    });

    flipbook.fadeIn(1000);

    // Sự kiện cho nút bấm
    $('#prev-btn').click(function() { flipbook.turn('previous'); });
    $('#next-btn').click(function() { flipbook.turn('next'); });

    // Hỗ trợ phím mũi tên bàn phím
    $(document).keydown(function(e) {
        if (e.keyCode == 37) flipbook.turn('previous');
        else if (e.keyCode == 39) flipbook.turn('next');
    });
}

yepnope({
    test: Modernizr.csstransforms,
    yep: ['js/turn.js'],
    both: ['js/zoom.min.js', 'js/hash.js'],
    complete: loadApp
});