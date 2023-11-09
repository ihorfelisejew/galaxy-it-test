import Swiper from 'swiper';

new Swiper('.products__slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView:4,
    slidesPerGroup:1,
    spaceBetween: 45,
});

const productsMenuItems = document.querySelectorAll('.products__menu_item');
productsMenuItems.forEach((item, index1) => {
    item.addEventListener('click', () =>{
        productsMenuItems.forEach((item2, index2) => {
            if(!item2.classList.contains('.not__active') && index1 != index2){
                item2.classList.add('not__active');
            }
            else{
                item2.classList.remove('not__active');
            }
        })
    })
})

const moreMenuItems = document.querySelectorAll('.more-inform__menu-item');
moreMenuItems.forEach((item, index1) => {
    item.addEventListener('click', () =>{
        moreMenuItems.forEach((item2, index2) => {
            if(!item2.classList.contains('item-active') && index1 == index2){
                item2.classList.add('item-active');
            }
            else if(index1 != index2)
            {
                item2.classList.remove('item-active');
            }
        })
    })
})