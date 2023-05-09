/** 
 * Factory pattern
 * 객체의 생성을 한 곳에서 관리
 * 
 * Genesis, Spark등 모든 차종이
 * 모두 각강의 공장에서 생산된다면,
 * 관리가 어려움
 * - 동일한 차량 옵션 등을 
 * 
 * 
 * 자동차 객체를 반복적으로 생성해야 한다면?
*/
const genesis1 = {
    model: "Genesis1",
    power: 20,
    moved: 0,

    run: function() {
        this.moved += this.power;
    }
};

const spark1 = {
    model: "Spark1",
    power: 13,
    moved: 0,

    run: function() {
        this.moved += this.power;
    }
};

genesis1.run();
console.log(`${genesis1.model} - moved: ${genesis1.moved}`);

spark1.run();
console.log(`${spark1.model} - moved: ${spark1.moved}`);

// To Factory

const createCar2 = function(model, power) {
    let moved = 0;

    return {
        model,
        moved,

        run: function() {
            this.moved += power;
        }
    };
};

const genesis2 = createCar2('Genesis2', 20);
genesis2.run();
genesis2.run();
console.log(`${genesis2.model} - moved: ${genesis2.moved}`);

const spark2 = createCar2('Spark2', 13);
spark2.run();
spark2.run();
console.log(`${spark2.model} - moved: ${spark2.moved}`);

// 단점: 모든 Car 객체마다 run method가 새롭게 생성
// 해결 방법은?

const CarActions = {
    run: function() {
        this.moved += this.power;
    }
};

const createCar3 = function(model, power) {
    this.model = model;
    this.power = power;
    this.moved = 0;
};

createCar3.prototype = CarActions;

const genesis3 = new createCar3('Genesis3', 25);
genesis3.run();
genesis3.run();
console.log(`${genesis3.model} - moved: ${genesis3.moved}`);

const spark3 = new createCar3('Spark3', 15);
spark3.run();
spark3.run();
console.log(`${spark3.model} - moved: ${spark3.moved}`);

// Class

// 이렇게 해야 아래 Car클래스의 static 메서드가 OCP원칙에 어긋나지 않게 수정할 수 있음
// function factory(model, power){
//     switch(model) {
//         case 'Genesis': return new genesis1(power);
//         case 'Spark': return new spark1(power);
//     }
// }
class Car {
    constructor(model, power) {
        this.model = model;  
        this.power = power;
        this.moved = 0;
    }

    // 인스턴스 메서드
    run() {
        this.moved += this.power;
    }

    // 정적 메서드
    static factory(model, power){
        switch(model) {
            case 'Genesis': return new Genesis(power);
            case 'Spark': return new Spark(power);
        }
    }
}

class Genesis extends Car {
    constructor(power) {
        super('Genesis', power);
    }
}

class Spark extends Car {
    constructor(power) {
        super('Spark', power);
    }
}

const genesis = Car.factory('Genesis', 27);
genesis.run();
genesis.run();
console.log(`${genesis.model} - moved: ${genesis.moved}`);

const spark = new createCar3('Spark3', 15);
spark3.run();
spark3.run();
console.log(`${spark.model} - moved: ${spark.moved}`);

/**
 * Factory method pattern
 * 컴포지션하는  객체들을 동일한 메소드에서 생성
 */

// SNS 클래스를 상속한 Facebook, LikedIn 클래스들이
// 컴포지션하는 Section 객체들을 createProfile 메소드에서 생성
class Section {}
class PersonalSection extends Section {}
class AlbumSection extends Section {}
class PatentSection extends Section {}
class PublicationSection extends Section {}

class SNS {
    constructor() {
        this.sections = [];
    }

    addSection(section) {
        this.sections.push(section);
    }

    getSections() {
        return this.sections;
    }
}

class Facebook extends SNS {
    createProfile() {
        this.addSection(new PersonalSection());
        this.addSection(new PatentSection());
        this.addSection(new PublicationSection());
    }
}

class LinkedIn extends SNS {
    createProfile() {
        this.addSection(new PersonalSection());
        this.addSection(new AlbumSection());
    }
}

const fb = new Facebook();
fb.createProfile();

const lk = new LinkedIn();
lk.createProfile();

console.log(fb.getSections())
console.log(lk.getSections())

