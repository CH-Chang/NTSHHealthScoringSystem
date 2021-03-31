/* 滑順下滑 */
$('.index-header-nav-item a').click(smoothScroll);
$('#index-home-next').click(smoothScroll);

function smoothScroll(event) {
  event.preventDefault();
  const targetId = $(event.currentTarget).attr('href');
  if (targetId.substring(0, 1) === '#') {
    window.scrollTo({
      top: targetId === '#' ? 0 : $(targetId).offset().top - 60,
      behavior: 'smooth'
    });
  }
}

/* 處理滑動nav切換粗體 */
let navItems = $('.index-header-nav-item');
let pageTops = [];
$('.index-header-nav-item a').each(function(index, elem) {
  let targetId = $(elem).attr('href');
  if (targetId !== '#' && targetId.substring(0, 1) === '#')
    pageTops.push($(targetId).offset().top);
});
$(window).scroll(function() {
  let scrollTop = $(document).scrollTop();
  for (let i = 0; i < pageTops.length; i++) {
    if (scrollTop <= pageTops[i]) {
      $('.index-header-nav-item-current').removeClass(
        'index-header-nav-item-current'
      );
      $(navItems.get(i)).addClass('index-header-nav-item-current');
      break;
    }
  }
});

/* 處理下滑後header展開 */
$(window).scroll(function() {
  let headerTop = $('#index-header').offset().top;
  if (headerTop >= 150) {
    $('#index-header')
      .stop()
      .animate({ 'min-width': '100vw', top: '0px' }, 500);
  } else {
    $('#index-header')
      .stop()
      .animate({ 'min-width': '1000px', top: '3%' }, 500);
  }
});

/* 處理各年級詳細資料選單 */
const rankNavs = $('.index-rank-detail-nav-item a');

$(function() {
  $('#index-rank-detail-table-2').hide();
  $('#index-rank-detail-table-3').hide();
  AOS.refresh();
});

$('.index-rank-detail-nav-item a').click(function(event) {
  let ori, cur;
  let selected = $('.index-rank-detail-nav-selected a');
  rankNavs.each(function(index, elem) {
    if (event.currentTarget === elem) cur = index;
  });

  $(selected)
    .parent()
    .removeClass('index-rank-detail-nav-selected');
  $(rankNavs[cur])
    .parent()
    .addClass('index-rank-detail-nav-selected');

  for (let i = 1; i <= 3; i++) $('#index-rank-detail-table-' + i).hide();
  $('#index-rank-detail-table-' + (cur + 1)).fadeIn('fast');
  AOS.refresh();
});
