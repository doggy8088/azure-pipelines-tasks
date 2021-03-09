import * as path from 'path';
import { TaskLibAnswers } from 'azure-pipelines-task-lib/mock-answer';

export const goodAnswers: TaskLibAnswers = {
  'which': {
    'bash': 'path/to/bash'
  },
  'checkPath': {
    '/bin/release': true,
    'C:\\bin\\release\\': true,
    'C:\\bin\\release': true,
    'C:\\bin\\release\\file.exe': true,
    'path/to/bash': true
  },
  'exec': {
    [`powershell.exe -NoLogo -Sta -NoProfile -NonInteractive -ExecutionPolicy Unrestricted -Command & \'${path.resolve(__dirname, '..', 'Invoke-Robocopy.ps1')}\' -Source \'C:\\bin\\release\' -Target \'\\\\UNCShare\\subdir\\drop\' -ParallelCount 1`]: {
      'stdout': 'test stdout from robocopy (no trailing slashes)',
      'stderr': '',
      'code': 0
    },
    [`powershell.exe -NoLogo -Sta -NoProfile -NonInteractive -ExecutionPolicy Unrestricted -Command & \'${path.resolve(__dirname, '..', 'Invoke-Robocopy.ps1')}\' -Source \'C:\\bin\\release\\.\' -Target \'\\\\UNCShare\\subdir\\drop\' -ParallelCount 1`]: {
      'stdout': 'test stdout from robocopy (source with trailing slash)',
      'stderr': '',
      'code': 0
    },
    [`powershell.exe -NoLogo -Sta -NoProfile -NonInteractive -ExecutionPolicy Unrestricted -Command & \'${path.resolve(__dirname, '..', 'Invoke-Robocopy.ps1')}\' -Source \'C:\\bin\\release\' -Target \'\\\\UNCShare\\drop\\.\' -ParallelCount 1`]: {
      'stdout': 'test stdout from robocopy (target with trailing slash)',
      'stderr': '',
      'code': 0
    },
    [`powershell.exe -NoLogo -Sta -NoProfile -NonInteractive -ExecutionPolicy Unrestricted -Command & \'${path.resolve(__dirname, '..', 'Invoke-Robocopy.ps1')}\' -Source \'C:\\bin\\release\' -Target \'\\\\UNCShare\\drop\\.\' -ParallelCount 1 -File \'file.exe\'`]: {
      'stdout': 'test stdout from robocopy (copy a single file)',
      'stderr': '',
      'code': 0
    },
    [`path/to/bash tar czvf ${path.join(process.cwd(), 'drop.tar.gz')} C:\\bin\\release\\file.exe`]: {
      'stdout': 'test stdout from bash: tar file',
      'stderr': '',
      'code': 0
    },
    [`path/to/bash tar czvf ${path.join(process.cwd(), 'drop.tar.gz')} C:\\bin\\release`]: {
      'stdout': 'test stdout from bash: tar folder',
      'stderr': '',
      'code': 0
    }
  },
  'stats': {
    '/bin/release': {
      'isFile': false
    },
    'C:\\bin\\release\\': {
      'isFile': false
    },
    'C:\\bin\\release': {
      'isFile': false
    },
    'C:\\bin\\release\\file.exe': {
      'isFile': true
    }
  }
};
