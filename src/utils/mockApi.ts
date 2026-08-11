export type MockResult = {
  testCaseId: string;
  passed: boolean;
  actualOutput: string;
  executionTimeMs: number;
  memoryUsedKb: number;
  input: string;
  expectedOutput: string;
};

export type SuccessResponse = {
  status: 'COMPLETED';
  overallResult: 'PASS' | 'FAIL';
  results: MockResult[];
  error: null;
};

export type ErrorResponse = {
  status: 'COMPILE_ERROR';
  overallResult: 'FAIL';
  results: never[];
  error: string;
};

export type MockApiResponse = SuccessResponse | ErrorResponse;

export const mockExecuteCode = async (
  language: string,
  sourceCode: string,
  forceError: boolean = false
): Promise<MockApiResponse> => {
  console.log(
    JSON.stringify(
      {
        language: language,
        sourceCode: sourceCode,
        testCases: [
          { id: "tc1", input: "5\n3", expectedOutput: "8" },
          { id: "tc2", input: "10\n20", expectedOutput: "30" }
        ]
      },
      null,
      2
    )
  );

  // 2-second mock network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (forceError) {
    return {
      status: 'COMPILE_ERROR',
      overallResult: 'FAIL',
      results: [],
      error: 'SyntaxError: unexpected token on line 3',
    };
  }

  return {
    status: 'COMPLETED',
    overallResult: 'PASS',
    results: [
      {
        testCaseId: 'tc1',
        passed: true,
        actualOutput: '8',
        executionTimeMs: 42,
        memoryUsedKb: 1280,
        input: '5',
        expectedOutput: '8',
      },
      {
        testCaseId: 'tc2',
        passed: false,
        actualOutput: '29',
        executionTimeMs: 391,
        memoryUsedKb: 1260,
        input: '10\n20',
        expectedOutput: '30',
      },
    ],
    error: null,
  };
};
