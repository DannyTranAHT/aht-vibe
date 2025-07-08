require('./helpers');

describe('Arithmetic', function () {
    // validation test
    describe('Validation', function () {
        it('rejects missing operation', function (done) {
            request.get('/arithmetic?operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Unspecified operation"});
                    done();
                });
        });
        it('rejects invalid operation', function (done) {
            request.get('/arithmetic?operation=foobar&operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operation: foobar"});
                    done();
                });
        });
        it('rejects missing operand1', function (done) {
            request.get('/arithmetic?operation=add&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operand1: undefined"});
                    done();
                });
        });
        it('rejects operands with invalid sign', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2-1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operand1: 4.2-1"});
                    done();
                });
        });
        it('rejects operands with invalid decimals', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2.1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operand1: 4.2.1"});
                    done();
                });
        });
    });

    // add test
    describe('Addition', function () {
        it('adds two positive integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('adds zero to an integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('adds a negative integer to a positive integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -21});
                    done();
                });
        });
        it('adds two negative integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -42});
                    done();
                });
        });
        it('adds an integer to a floating point number', function (done) {
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -2.5});
                    done();
                });
        });
        it('adds with negative exponent', function (done) {
            request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 0});
                    done();
                });
        });

    /// add test case with 2 floating numbers
    // example: 0.1 + 0.2
        it('adds two floating point numbers', function (done) {
            request.get('/arithmetic?operation=add&operand1=0.1&operand2=0.2')
                .expect(200)
                .end(function (err, res) {
                    expect(Math.abs(res.body.result - 0.3)).to.be.below(1e-10);
                    done();
                });
        });        

    });

    // subtract test
    describe('Subtraction', function () {
        it('subtracts two positive integers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 0});
                    done();
                });
        });
        it('subtracts zero from an integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('subtracts a negative integer from a positive integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 63});
                    done();
                });
        });
        it('subtracts two negative integers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 0});
                    done();
                });
        });
        it('subtracts an integer from a floating point number', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 7.5});
                    done();
                });
        });
        it('subtracts with negative exponent', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 2.4e-5});
                    done();
                });
        });
    });

    // multiply test
    describe('Multiplication', function () {
        it('multiplies two positive integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 441});
                    done();
                });
        });
        it('multiplies zero with an integer', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 0});
                    done();
                });
        });
        it('multiplies a negative integer with a positive integer', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -882});
                    done();
                });
        });
        it('multiplies two negative integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 441});
                    done();
                });
        });
        it('multiplies an integer with a floating point number', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -12.5});
                    done();
                });
        });
        it('multiplies with negative exponent', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -1.44e-10});
                    done();
                });
        });
    });

    // divide test
    describe('Division', function () {
        it('divides two positive integers', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 1});
                    done();
                });
        });
        it('divides an integer by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=0')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Division by zero"});
                    done();
                });
        });
        it('divides a negative integer by a positive integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -0.5});
                    done();
                });
        });
        it('divides two negative integers', function (done) {
            request.get('/arithmetic?operation=divide&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 1});
                    done();
                });
        });
        it('divides an integer by a floating point number', function (done) {
            request.get('/arithmetic?operation=divide&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -0.5});
                    done();
                });
        });
        it('divides with negative exponent', function (done) {
            request.get('/arithmetic?operation=divide&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -1});
                    done();
                });
        });
    });

    // power test
    describe('Power', function () {
        it('raises a positive integer to a positive integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 8});
                    done();
                });
        });
        it('raises a positive integer to zero power', function (done) {
            request.get('/arithmetic?operation=power&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 1});
                    done();
                });
        });
        it('raises a negative integer to a positive integer power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -8});
                    done();
                });
        });
        it('raises a negative integer to an even power', function (done) {
            request.get('/arithmetic?operation=power&operand1=-2&operand2=4')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 16});
                    done();
                });
        });
        it('raises an integer to a floating point number power', function (done) {
            request.get('/arithmetic?operation=power&operand1=4&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(Math.abs(res.body.result - 2)).to.be.below(1e-10);
                    done();
                });
        });
        it('raises with negative exponent', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=-3')
                .expect(200)
                .end(function (err, res) {
                    expect(Math.abs(res.body.result - 0.125)).to.be.below(1e-10);
                    done();
                });
        });
    }
    );

    // Percentage test
    describe('Percentage', function () {
        it('calculates percentage of a positive integer', function (done) {
            request.get('/arithmetic?operation=percentage&operand1=200&operand2=50')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 100});
                    done();
                });
        });
        it('calculates percentage of a negative integer', function (done) {
            request.get('/arithmetic?operation=percentage&operand1=-200&operand2=50')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -100});
                    done();
                });
        });
        it('calculates percentage with zero as second operand', function (done) {
            request.get('/arithmetic?operation=percentage&operand1=200&operand2=0')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Percentage cannot be calculated with zero as second operand"});
                    done();
                });
        });
    }
    );

});
