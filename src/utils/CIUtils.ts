const nextTen = (number: number) => {
    while (number % 10 !== 0) {
        number++;
    }
    return number;
}

export class CIUtils {
    public static checkIdentification(id: string) {
        if (!/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24)[0-9]{8}$|(001|002|003).?$/.test(id)) {
            return false;
        }
        let flag = false;
        if (/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24).?[0-9]{8}(001|002|003).?$/.test(id)) {
            flag = CIUtils.verifyRUC(id);
        } else if (/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24)[0-9]{8}?$/.test(id)) {
            flag = CIUtils.verifyID(id);
        }
        return flag;
    }

    private static verifyID(id: string) {
        let summatory = 0;
        for (let i = 0; i < id.length - 1; i++) {
            if (i % 2 === 0) {
                let product = parseInt(id.charAt(i)) * 2;
                if (product >= 10) {
                    product -= 9;
                }
                summatory += product;
            } else {
                summatory += parseInt(id.charAt(i));
            }
        }
        return ((nextTen(summatory) - summatory) === parseInt(id.charAt(id.length - 1)));
    }

    private static verifyRUC(id: string) {
        const third = id.charAt(2);
        if (parseInt(third) > 5 && (parseInt(third) !== 9 && parseInt(third) !== 6)) {
            return false;
        }
        let flag = false;
        if (parseInt(third) < 6) {
            flag = CIUtils.verifyID(id.slice(0, -3));
        } else if (parseInt(third) === 6) {
            flag = CIUtils.verifyPublic(id)
        } else if (parseInt(third) === 9) {
            flag = CIUtils.verifyJuridic(id)
        }

        return flag;
    }

    private static verifyPublic(id: string) {
        id = id.slice(0, -4);
        let summatory = 0;
        const coeficients = [3, 2, 7, 6, 5, 4, 3, 2];
        coeficients.forEach((element: number, index: number) => {
            summatory += parseInt(id.charAt(index)) * element;
        });
        return ((11 - summatory % 11) === parseInt(id.charAt(id.length - 1)));
    }

    private static verifyJuridic(id: string) {
        id = id.slice(0, -3);
        let summatory = 0;
        const coeficients = [4, 3, 2, 7, 6, 5, 4, 3, 2];
        coeficients.forEach((element: number, index: number) => {
            summatory += parseInt(id.charAt(index)) * element;
        });
        return ((11 - summatory % 11) === parseInt(id.charAt(id.length - 1)));
    }
}