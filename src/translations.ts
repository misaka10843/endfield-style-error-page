export type Language = 'zh' | 'en' | 'jp';

export interface ErrorInfo {
  title: string;
  message: string;
  suggestion: string;
}

export interface Translations {
  [key: string]: {
    [lang in Language]: ErrorInfo;
  };
}

export const translations: Translations = {
  '404': {
    zh: {
      title: '目标坐标未响应',
      message: '系统无法在当前协议下定位指定资源。',
      suggestion: '请检查访问路径或联系管理员。'
    },
    en: {
      title: 'COORDINATE NOT RESPONDING',
      message: 'System failed to locate the specified resource under current protocol.',
      suggestion: 'Please verify the access path or contact administrator.'
    },
    jp: {
      title: '目標座標が応答しません',
      message: '現在のプロトコル下で指定されたリソースを特定できませんでした。',
      suggestion: 'アクセスパスを確認するか、管理者に連絡してください。'
    }
  },
  '500': {
    zh: {
      title: '核心逻辑崩溃',
      message: '服务器在处理请求时遭遇了不可预期的逻辑冲突。',
      suggestion: '系统正在尝试自我修复，请稍后重试。'
    },
    en: {
      title: 'CORE LOGIC COLLAPSE',
      message: 'Server encountered an unexpected logical conflict while processing request.',
      suggestion: 'System is attempting self-repair. Please try again later.'
    },
    jp: {
      title: 'コアロジック崩壊',
      message: 'リクエスト処理中に予期しない論理的衝突が発生しました。',
      suggestion: 'システムが自己修復を試みています。後でもう一度お試しください。'
    }
  },
  '403': {
    zh: {
      title: '权限验证失败',
      message: '您的安全等级不足以访问该加密区域。',
      suggestion: '请提交身份验证申请或返回安全区域。'
    },
    en: {
      title: 'PERMISSION DENIED',
      message: 'Your security clearance is insufficient to access this encrypted zone.',
      suggestion: 'Please submit identity verification or return to safe zone.'
    },
    jp: {
      title: '権限検証失敗',
      message: 'この暗号化エリアにアクセスするためのセキュリティレベルが不足しています。',
      suggestion: '本人確認を申請するか、安全なエリアに戻ってください。'
    }
  },
  'default': {
    zh: {
      title: '未知系统异常',
      message: '检测到未分类的异常信号，系统稳定性下降。',
      suggestion: '建议执行系统重启或检查硬件连接。'
    },
    en: {
      title: 'UNKNOWN SYSTEM ANOMALY',
      message: 'Unclassified anomaly detected. System stability degraded.',
      suggestion: 'Recommended to perform system reboot or check hardware connection.'
    },
    jp: {
      title: '未知のシステム異常',
      message: '未分類の異常信号が検出されました。システムの安定性が低下しています。',
      suggestion: 'システムの再起動またはハードウェア接続の確認を推奨します。'
    }
  }
};

export const uiStrings = {
  systemStatus: {
    zh: '系统状态: 异常',
    en: 'SYSTEM STATUS: ANOMALY',
    jp: 'システムステータス: 異常'
  },
  backToHome: {
    zh: '返回主界面',
    en: 'RETURN TO INTERFACE',
    jp: 'インターフェースに戻る'
  },
  errorCode: {
    zh: '错误代码',
    en: 'ERROR CODE',
    jp: 'エラーコード'
  }
};
