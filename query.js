// vk script

var seed = API.utils.getServerTime();

// https://en.wikipedia.org/wiki/Linear_congruential_generator
// glibc (used by GCC) constants

var a = 1103515245;
var c = 12345;
var m = 2147483647;

var random_int = (a * seed + c) % m;
var max_multiplier = 1.0 / (1.0 + (m - 1));

var random = random_int * max_multiplier;
if (random < 0) {
    random = 0 - random;
}

var pics_count = API.photos.get({album_id: "saved"}).count;
var random_pic_offset = random * pics_count;

// Math.floor()
random_pic_offset = random_pic_offset - (random_pic_offset % 1);

return API.photos.get({
    album_id: "saved", 
    count: 1, 
    offset: random_pic_offset
}).items[0].photo_604;