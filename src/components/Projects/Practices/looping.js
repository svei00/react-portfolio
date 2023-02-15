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