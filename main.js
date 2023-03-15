

const form = document.forms.searchForm;
      search = form.search;

const answerWrapper = document.querySelector('.answerWrapper')



      
form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (search.value.length < 2) {
      answerWrapper.innerHTML = `Слишком мало символов`
    } else {

    fetch(`https://api.github.com/search/repositories?q=${search.value}`)
  .then(response => response.json())
  .then(repositories => {

    if(repositories.total_count === 0) {
      answerWrapper.innerHTML = `Ой, ничего не найдено`
    } else {
      answerWrapper.innerHTML = repositories.items.filter((item, x) => x < 10).map(i => 
        `<li class="answerList">
            <div class="userInfoWrapper">
                <img src="${i.owner.avatar_url}" alt="ava">
            </div>
            <div class="infoWrapper">
                <div class="nameWrapper">
                    <h5>Название репозитория:</h5>
                    <a href="${i.html_url}" target="_blank">${i.name} </a>
                </div>
                <div class="langWrapper">
                    <h5>Автор:</h6>
                    <a href="${i.owner.html_url}" target="_blank">${i.owner.login}</a>
                </div>
                <div class="langWrapper">
                    <h5>Язык:</h6>
                    <p>${i.language}</p>
                </div>
            </div>
        </li>`).join("");  
          }
        });
    }}
)



//  ${i.url} запихать в a
// language язык

// ${i.owner.login} имя пользователя
// ${i.owner.avatar_url} авка
//${i.owner.html_url} ссылка на акканут 



/*




const octokit = new Octokit({
    auth: 'YOUR-TOKEN'
  })
  
  await octokit.request('GET /search/repositories', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
*/
/*
  curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/search/repositories?q=Q
  */