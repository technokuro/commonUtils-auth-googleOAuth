/**
 * @file Google OAuth 実装サポート.
 * @author TechnoKuRo <hiro@techno-kuro.com>
 * @copyright 著作権は放棄しません
 * @license 改変は自由ですが、authorの記載をお願いします
 * @since v1.0.0
 * @version 初期バージョン
 */

/**
 * Google OAuth パラメタ prompt の列挙.
 */
const GOA_PROMPT = {
    NONE: 'none',
    CONSENT: 'consent',
    SELECT_ACCOUNT: 'select_account',
};

/**
 * 内部で利用する定数.
 */
const __GOA_DEFS = {
    AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    TOKEN_URL: 'https://www.googleapis.com/oauth2/v4/token',
    EMAIL_URL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    RESPONSE_TYPE: (isWebApp) => isWebApp ? 'code' : '',
    ACCESS_TYPE: (isOffline) => isOffline ? 'offline': 'online',
};

/**
 * Google OAuth 2.0 アクセストークン取得処理
 * <pre>
 *  Google OAuth 2.0 で必要なパラメタを引数で受け取り、Google OAuth 2.0 サーバに POST 送信します
 * </pre>
 * @param {string} clientId 
 * @param {string} redirectUri 
 * @param {boolean} isWebApp 
 * @param {string} scope 
 * @param {boolean} [isAccessTypeOffline] 
 * @param {string} [state] 
 * @param {boolean} [isIncludeGrantedScopes] 
 * @param {string} [loginHint] 
 * @param {string} [prompt] 
 */
function startAuth(clientId, redirectUri, isWebApp = false, scope, isAccessTypeOffline = false, state, isIncludeGrantedScopes = false, loginHint, prompt){
    if(!clientId) throw 'clientId required';
    if(!redirectUri) throw 'redirectUri required';
    const _form = document.createElement('form');
    _form.action = __GOA_DEFS.AUTH_URL;
    _form.method = 'POST';
    const _clientId = document.createElement('input');
    _clientId.type = 'hidde';
    _clientId.name = 'client_id';
    _clientId.value = clientId;
    _form.appendChild(_clientId);

    const _redirectUri = document.createElement('input');
    _redirectUri.type = 'hidde';
    _redirectUri.name = 'redirect_uri';
    _redirectUri.value = redirectUri;
    _form.appendChild(_redirectUri);
    
    const _responseType = document.createElement('input');
    _responseType.type = 'hidde';
    _responseType.name = 'response_type';
    _responseType.value = __GOA_DEFS.RESPONSE_TYPE(isWebApp);
    _form.appendChild(_responseType);
    
    if(scope){
        const _scope = document.createElement('input');
        _scope.type = 'hidde';
        _scope.name = 'scope';
        _scope.value = scope;
        _form.appendChild(_scope);
    }
    const _accessType = document.createElement('input');
    _accessType.type = 'hidde';
    _accessType.name = 'access_type';
    _accessType.value = __GOA_DEFS.ACCESS_TYPE(isAccessTypeOffline);
    _form.appendChild(_accessType);
    
    if(state){
        const _state = document.createElement('input');
        _state.type = 'hidde';
        _state.state = 'state';
        _state.value = state;
        _form.appendChild(_state);
    }
    if(isIncludeGrantedScopes){
        const _includeGrantedScopes = document.createElement('input');
        _includeGrantedScopes.type = 'hidde';
        _includeGrantedScopes.name = 'include_granted_scopes';
        _includeGrantedScopes.value = 'true';
        _form.appendChild(_includeGrantedScopes);
    }
    if(loginHint){
        const _loginHint = document.createElement('input');
        _loginHint.type = 'hidde';
        _loginHint.name = 'login_hint';
        _loginHint.value = loginHint;
        _form.appendChild(_loginHint);
    }
    if(prompt){
        const _prompt = document.createElement('input');
        _prompt.type = 'hidde';
        _prompt.name = 'prompt';
        _prompt.value = prompt;
        _form.appendChild(_prompt);    
    }
    _form.style.display = 'none';
    document.body.appendChild(_form);
    _form.submit();
}