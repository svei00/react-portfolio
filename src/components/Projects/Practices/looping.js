function looping() {
    let loop = '#';

    while (loop.length <= 7) {
        console.log(loop);
        loop = loop + "#"
    }
}

function fizz() {
    for(let i = 1; i <= 100; i++) {
        if(i % 15 === 0) {
            console.log('FizzBuzz');
        }else if(i % 3 === 0) {
            console.log('Fizz'); 
        }else if (i % 5 === 0){
            console.log("Buzz");
        }else {
            console.log(i);
        }
    }
}

function buzz() {
    for(let i = 0; i < 100;) {
        console.log(
            (++i % 3 ? '' : 'Fizz') +
            (i % 5 ? '' : 'Buzz') || i
        );
    }
}

function chessboard () {
    let output = '';
    for (let i = 1; i <= 8; i++) {
        for(let j = 1; j <= 8; j++) {
            ((i + j) %2 == 0 ? output += ' ' : output += '#');
        }
        output += '\n';
    }
    console.log(output);

}

function power(base, exp) {
    let result = 1;
    for(let i = 0; i < exp; i++){
        result *= base;
    }
    return result;
}

function pine() {
    let output = 8;
    for(let i = 0; i < output; i++){
        for(let j = output - 1; j > i; j--){
            console.log('\xA0 \xA0');
        }
        for(let k = 0; k <= (i*2); k++){
            console.log('^');
        }
        console.log('\n');
    }
}

function fizzbuzz2() {
    for (let i = 1; i <= 100; i++) {
        let output = '';
        if(i % 3 === 0) output += 'Fizz ';
        if(i % 5 === 0) output += 'Buzz';
        console.log(output || i);
    }
}
