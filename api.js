const BACKEND_URL="https://script.google.com/macros/s/AKfycbwWdGfRWufhuuKMB1qgIw0uiIYKzcNiz3BZ9OGJuJZJkrNDdnEjKWDKwx4tmCkZXMtV0g/exec"

function addIfNotExists(value, tableName, tableRange){
    return fetch(BACKEND_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'addIfNotExists',
            value: value,
            tableName: tableName,
            tableRange: tableRange,
            id_token: getIdToken()
        })
    });
}