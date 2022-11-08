let voyelles = "a e i o u y ae ea ai ia ao ua ay ya ette".split(" ")
let consonnes = "b c d f g h j k l m n p q r s t v w x y z ch cl st ss nd tt pt br".split(" ")

// Suite de lettres interdites
let forbidden_start = "qx qz qr qt qp qs qd qf qg qh qj qk ql qm qw qx qc qv qb qn ea o qa qe qi qy qo zi xy xu wy zu zy xi xo za ze xa xe tu yy uk yo sx sw sss sn sr np sb sf sg sj sll ty yz yx yn yl yk ym yp yq yr yg yd yc ys yt yb yf yj uu ouou yh uo oo sss sz".split(" ")
let forbidden_middle = "yy qx qz qr qt qp qs qd qf qg qh qj qk ql qm qw qx qc qv qb qn bch bk bnd bmu brb brm chp chb chg bg tt nn by lc fy aa qa qe qi qy qo".split(" ")
let forbidden_end = "qx qz qr qt qp qs qd qf qg qh qj qk ql qm qw qx qc qv qb qn ch ao yw br aex ael ael eah qa qe qi qy qo ch yy j rr ux uz ph thu pp ll nn q ox k z p d b uj ug uc uh um ur uss ust utr st sl eac eaf aj cl cla g eay aech v fu".split(" ")
 
// Suite de lettres obligatoires
let required_start = "".split(" ")
// Taille du prénom
//let syllables = 2 à tester
let length_min = 4
let length_max = 6
 
function generate_associations(voyellesArray, consonnesArray){
    let associations = []
 
  voyellesArray.forEach(voyelle => {
    consonnesArray.forEach(consonne => {
      associations.push(voyelle + consonne)
    }) 
  })
  return associations
}

function authorized(name){
  if(name.length > length_max) return false
  if (name.length < length_min) return false 
  let commenceParOk = false
  for (let i = 0; i < required_start.length; i++){
    if (name.search(required_start[i]) != 0) {
      commenceParOk = false
    } else {
      commenceParOk = true
      break;
    }
  }

  if(commenceParOk == true){
    for (let i = 0; i < forbidden_middle.length;  i++){
      if (name.search(forbidden_middle[i]) > 0) return false
    }
    for (let i = 0; i < forbidden_start.length;  i++){
      if (name.search(forbidden_start[i]) == 0) return false
    }
    for (let i = 0; i < forbidden_end.length;  i++){
      if (name.endsWith(forbidden_end[i]) > 0)  return false
    }
      return true
  } else {
    return false
  }
}


let blocks = []
blocks[0] = generate_associations(voyelles, consonnes)
blocks[1] = generate_associations(consonnes, voyelles)


let names = []
names = names.concat(generate_associations(blocks[0], blocks[0]))
names = names.concat(generate_associations(blocks[0], blocks[1]))
names = names.concat(generate_associations(blocks[1], blocks[0]))
names = names.concat(generate_associations(blocks[1], blocks[1]))

names = names.sort()
//names = names.map(name => name.charAt(0).toUpperCase()+name.slice(1))


var alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(' ')
var listePrenoms = {}
alphabet.forEach(letter => {
  listePrenoms[letter] = []
})
let nombrePrenoms = 0
names.forEach(name => {
  if (authorized(name)) {
    name = name.charAt(0).toUpperCase()+name.slice(1)
    listePrenoms[name.charAt()].push(name)
    nombrePrenoms ++
  }
})

let wrapper = document.getElementById('wrapper')
let nombreDiv = document.getElementById('nombre')
let texteNombre = ''
texteNombre += nombrePrenoms + ' prénom'
if (nombrePrenoms > 0) {
  texteNombre +=  's'
} 
texteNombre += ' généré'
if (nombrePrenoms > 0) {
  texteNombre +=  's'
} 
nombreDiv.innerHTML = texteNombre

for (letter in listePrenoms) {
  let letterContainer = document.createElement('div')
  wrapper.appendChild(letterContainer)
  letterContainer.setAttribute('id', 'letter' + letter)
  let titreLetter = document.createElement('h2')
  titreLetter.innerHTML = letter
  letterContainer.appendChild(titreLetter)
  let prenomContainer = document.createElement('div')
  prenomContainer.classList.add('flex')
  listePrenoms[letter].forEach(prenom => {
    let spanLetter = document.createElement('span')
    spanLetter.innerHTML = prenom
    prenomContainer.appendChild(spanLetter)
  })
  letterContainer.appendChild(prenomContainer)
}