let app = {
    func: {
        hesapla: () => {
            let typeOfMaterial = $(".type-of-material").val();
            let kalinlik = $(".thickness").val().replace(".", "").replace(",", ".");
            let en = $(".inner-diameter").val().replace(".", "").replace(",", ".");
            let uzunluk = $(".length").val().replace(".", "").replace(",", ".");
            let adet = $(".quantity").val();
            let ozgulagirlik = $(".specific-weight").val();
            let pi = 3.14;
            let result;
            if (typeOfMaterial === "dortgen") {
                app.func.removeClass();
                result = app.func.dortgen(kalinlik, en, uzunluk, adet, ozgulagirlik);
                app.func.resultHtml(result);
            } else if (typeOfMaterial === "yuvarlak") {
                app.func.addClass();
                result = app.func.yuvarlak(pi, kalinlik, uzunluk, adet, ozgulagirlik);
                app.func.resultHtml(result);
            } else if (typeOfMaterial === "boru") {
                app.func.removeClass();
                result = app.func.boru(pi, kalinlik, uzunluk, en, adet, ozgulagirlik);
                app.func.resultHtml(result);
            } else if (typeOfMaterial === "altigen") {
                app.func.addClass();
                result = app.func.altigen(kalinlik, uzunluk, adet, ozgulagirlik);
                app.func.resultHtml(result);
            }
        },
        addClass: () => {
            if (!$(".inner-diameter").parent().parent().hasClass("d-none")) {
                $(".inner-diameter").parent().parent().addClass("d-none");
            }
        },
        removeClass: () => {
            if ($(".inner-diameter").parent().parent().hasClass("d-none")) {
                $(".inner-diameter").parent().parent().removeClass("d-none");
            }
        },
        resultHtml: (result) => {
            if (result > 0.0000) {
                $(".weight").removeClass("d-none");
                $(".weight").html(result.toFixed(3).toString() + " Kg");
            } else {
                $(".weight").addClass("d-none");
            }
        },
        dortgen: (kalinlik, en, uzunluk, adet, ozgulagirlik) => {
            return kalinlik * en * uzunluk * adet * ozgulagirlik;
        },
        yuvarlak: (pi, kalinlik, uzunluk, adet, ozgulagirlik) => {
            return ((pi * (kalinlik * kalinlik)) / 4) * uzunluk * adet * ozgulagirlik;
        },
        boru: (pi, kalinlik, uzunluk, en, adet, ozgulagirlik) => {
            return (((pi * (kalinlik * kalinlik) / 4 * uzunluk) - (pi * (en * en) / 4 * uzunluk)) * adet * ozgulagirlik);
        },
        altigen: (kalinlik, uzunluk, adet, ozgulagirlik) => {
            return 0.866 * kalinlik * kalinlik * uzunluk * adet * ozgulagirlik;
        }
    },
};
$(document).ready(() => {
    $(".specific-weight").val($(".material-quality").val())
    $(".thickness,.inner-diameter,.length,.quantity").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) { return false; };
    });
    $(".thickness,.inner-diameter,.length").mask("#.##0,00", { reverse: true });
    $(".type-of-material,.material-quality").select2();
    let typeOfImage = $(".type-of-material :selected").attr("data-img");
    $(".image img").attr("src", typeOfImage);
})

$(".material-quality").on("change", (e) => {
    $(".specific-weight").val($(e.currentTarget).val())
    app.func.hesapla();
});
$(".type-of-material").on("change", (e) => {
    let typeOfImage = $(".type-of-material :selected").attr("data-img");
    $(".image img").attr("src", typeOfImage);
    app.func.hesapla();
});
$(".thickness").on("keyup", (e) => {
    if ($(e.currentTarget).val().replace(".", "").replace(",", ".") < 100 && $(e.currentTarget).val().replace(".", "").replace(",", ".") !== "") {
        if ($(e.currentTarget).parent().find("span").hasClass("error-message")) {
            $(e.currentTarget).parent().find(".error-message").remove()
        }
        $(e.currentTarget).after("<span style='font-size:12px;' class='text-danger error-message'>Kalınlık 100 cm'den küçük olamaz</span>")
    } else {
        $(e.currentTarget).parent().find(".error-message").remove()
        app.func.hesapla();
    }
});
$(".inner-diameter").on("keyup", (e) => {
    if ($(e.currentTarget).val().replace(".", "").replace(",", ".") < 10 && $(e.currentTarget).val().replace(".", "").replace(",", ".") !== "") {
        if ($(e.currentTarget).parent().find(".error-message").length > 0) {
            $(e.currentTarget).parent().find(".error-message").remove()
        }
        $(e.currentTarget).after("<span style='font-size:12px;' class='text-danger error-message'>En 10 cm'den küçük olamaz</span>")
    } else {
        $(e.currentTarget).parent().find(".error-message").remove()
        app.func.hesapla();
    }
});
$(".length").on("keyup", (e) => {
    if ($(e.currentTarget).val().replace(".", "").replace(",", ".") < 1000 && $(e.currentTarget).val().replace(".", "").replace(",", ".") !== "") {
        if ($(e.currentTarget).parent().find(".error-message").length > 0) {
            $(e.currentTarget).parent().find(".error-message").remove()
        }
        $(e.currentTarget).after("<span style='font-size:12px;' class='text-danger error-message'>Uzunlık 1000 cm'den küçük olamaz</span>")
    } else {
        $(e.currentTarget).parent().find(".error-message").remove()
        app.func.hesapla();
    }
});
$(".quantity").on("keyup", (e) => {
    if ($(e.currentTarget).val().replace(".", "").replace(",", ".") < 1 && $(e.currentTarget).val().replace(".", "").replace(",", ".") !== "") {
        if ($(e.currentTarget).parent().find(".error-message").length > 0) {
            $(e.currentTarget).parent().find(".error-message").remove()
        }
        $(e.currentTarget).after("<span style='font-size:12px;' class='text-danger error-message'>Adet 1'den küçük olamaz</span>")
    } else {
        $(e.currentTarget).parent().find(".error-message").remove()
        app.func.hesapla();
    }
});

$(".thickness,.inner-diameter,.length").on("focus", (e) => {
    $(e.currentTarget).mask("###0,00", { reverse: true });
});
$(".thickness,.inner-diameter,.length").on("blur", (e) => {
    $(e.currentTarget).mask("#.##0,00", { reverse: true });
});
$(".thickness,.inner-diameter,.length").on("click", (e) => {
    $(e.currentTarget).select();
});